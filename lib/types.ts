export type InquiryStatus = "New" | "Contacted" | "Qualified" | "Archived";

export type Inquiry = {
  id: string;
  created_at: string;
  status: InquiryStatus;
  company: string;
  contact: string;
  email: string;
  phone?: string | null;
  locations?: string | null;
  segment?: string | null;
  message: string;
  note?: string | null;
};

export type InquiryInput = Omit<Inquiry, "id" | "created_at" | "status">;
