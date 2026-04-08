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
    userId: number;
    eventId: number;
  }

  interface RegisterForm {
    name: string;
    password: string;
  }
}
