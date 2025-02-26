import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { logActivity } from "@/lib/activity";

type TransactionStatus = "pending" | "completed" | "failed" | "refunded";
type TransactionType = "subscription" | "listing" | "boost" | "refund";

interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  type: TransactionType;
  reference: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

interface TransactionFilters {
  status?: TransactionStatus;
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

interface TransactionState {
  transactions: Transaction[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  filters: TransactionFilters;
  fetchTransactions: (page?: number, limit?: number) => Promise<void>;
  setFilters: (filters: TransactionFilters) => void;
  processTransaction: (
    data: Omit<Transaction, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;
  updateTransaction: (id: string, status: TransactionStatus) => Promise<void>;
  refundTransaction: (id: string, amount?: number) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  totalCount: 0,
  loading: false,
  error: null,
  filters: {},

  setFilters: (filters) => set({ filters }),

  fetchTransactions: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      let query = supabase
        .from("transactions")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      const { filters } = get();
      if (filters.status) query = query.eq("status", filters.status);
      if (filters.type) query = query.eq("type", filters.type);
      if (filters.startDate) query = query.gte("created_at", filters.startDate);
      if (filters.endDate) query = query.lte("created_at", filters.endDate);
      if (filters.minAmount) query = query.gte("amount", filters.minAmount);
      if (filters.maxAmount) query = query.lte("amount", filters.maxAmount);

      const { data, error, count } = await query;

      if (error) throw error;
      set({ transactions: data || [], totalCount: count || 0 });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  processTransaction: async (data) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from("transactions").insert([data]);
      if (error) throw error;

      await logActivity({
        userId: data.user_id,
        action: "transaction_processed",
        entityType: "transaction",
        details: { type: data.type, amount: data.amount },
      });

      await get().fetchTransactions();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateTransaction: async (id, status) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from("transactions")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;

      await logActivity({
        userId: "system",
        action: "transaction_updated",
        entityType: "transaction",
        entityId: id,
        details: { status },
      });

      await get().fetchTransactions();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  refundTransaction: async (id, amount) => {
    set({ loading: true, error: null });
    try {
      // Get original transaction
      const { data: transaction, error: fetchError } = await supabase
        .from("transactions")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      // Create refund transaction
      const refundAmount = amount || transaction.amount;
      const { error: refundError } = await supabase
        .from("transactions")
        .insert([
          {
            user_id: transaction.user_id,
            amount: -refundAmount,
            currency: transaction.currency,
            status: "completed",
            type: "refund",
            reference: `refund_${transaction.id}`,
            metadata: {
              original_transaction_id: transaction.id,
              reason: "admin_refund",
            },
          },
        ]);

      if (refundError) throw refundError;

      // Update original transaction
      const { error: updateError } = await supabase
        .from("transactions")
        .update({ status: "refunded", updated_at: new Date().toISOString() })
        .eq("id", id);

      if (updateError) throw updateError;

      await logActivity({
        userId: "system",
        action: "transaction_refunded",
        entityType: "transaction",
        entityId: id,
        details: { amount: refundAmount },
      });

      await get().fetchTransactions();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
