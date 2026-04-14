declare namespace Master {
  interface EventForm {
    eventCategoryId?: number;
    userId?: number;
    eventCategory: string;
    name: string;
    eventDate: string;
    eventTime: string;
    description: string;
    location: string;
    createdBy: string;
    joinedCount?: number;
  }

  interface Events extends EventForm {
    id: number;
  }

  interface LoginResponse {
    isLoggedIn: boolean;
    user: {
      id: number;
      name: string;
    };
  }

  interface LoginForm {
    name: string;
    password: string;
  }

  interface User {
    id: number;
    name: string;
  }

  interface Category {
    id: number;
    name: string;
  }

  interface JoinedEvent {
    id: number;
    name: string;
    description: string;
    eventDate: string;
    eventTime: string;
    location: string;
  }

  interface UserProfile {
    id: number;
    name: string;
    joinedEvents: JoinedEvent[];
    totalJoinedEvents: number;
  }

  interface JoinEvent {
    eventId: number;
  }

  interface RegisterForm {
    name: string;
    password: string;
  }

  interface EventReportItem {
    eventId: number;
    eventName: string;
    joinedUsers: number;
    eventDate: string;
    status: string;
  }

  interface DashboardReport {
    totalEvents: number;
    totalUsers: number;
    activeEvents: number;
    expiredEvents: number;
    eventReports: EventReportItem[];
  }
}
