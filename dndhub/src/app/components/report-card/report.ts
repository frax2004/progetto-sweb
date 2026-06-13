

export interface ReportRequest {
  sender: string;
  when: string;
  reason: string;
  description: string;
  onClose: (e: Event) => void;
}