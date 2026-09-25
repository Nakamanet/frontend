import api from './axios'

export interface ReportedItem {
  reportable_type: string
  reportable_id: number
  report_count: number
  target: {
    id: number
    content: string
    created_at: string
    user: {
      id: number
      username: string
      avatar_url: string | null
    }
  } | null
  latest_reason: string | null
  latest_details: string | null
}

export interface PaginatedReports {
  data: ReportedItem[]
  current_page: number
  last_page: number
  total: number
}

export async function reportContent(reportable_type: string, reportable_id: number, reason?: string): Promise<void> {
  await api.post('/reports', { reportable_type, reportable_id, reason })
}

export async function getAdminReports(page = 1): Promise<PaginatedReports> {
  const { data } = await api.get('/admin/reports', { params: { page } })
  return data
}

export async function dismissReport(reportable_type: string, reportable_id: number): Promise<void> {
  await api.post('/admin/reports/dismiss', { reportable_type, reportable_id })
}

export async function takeReportAction(
  reportable_type: string,
  reportable_id: number,
  action: 'delete_content' | 'warn_user' | 'dismiss'
): Promise<void> {
  await api.post('/admin/reports/action', { reportable_type, reportable_id, action })
}