/// API Configuration for Branding Catalyst App
class ApiConfig {
  // Production Backend URL (Heroku)
  static const String baseUrl = 'https://bcat-api-server-5a8bd4496e19.herokuapp.com/api';
  static const String socketUrl = 'https://bcat-api-server-5a8bd4496e19.herokuapp.com';
  
  // Auth endpoints
  static const String login = '/auth/login';
  static const String register = '/auth/register';
  static const String me = '/auth/me';
  static const String adminPasswordReset = '/auth/admin-password-reset';
  
  // User endpoints
  static const String users = '/users';
  static const String userProfile = '/users/profile';
  static const String userStatus = '/users/status';
  
  // Workspace endpoints
  static const String workspaces = '/workspaces';
  
  // Channel endpoints
  static const String channels = '/channels';
  
  // Message endpoints
  static const String messages = '/messages';
  
  // Conversation (DM) endpoints
  static const String conversations = '/conversations';
  
  // Task endpoints
  static const String tasks = '/tasks';
  
  // Project endpoints
  static const String projects = '/projects';
  
  // File endpoints
  static const String files = '/files';
  
  // Todo endpoints
  static const String todos = '/todos';
  
  // Canvas endpoints
  static const String canvas = '/canvas';
  
  // Huddle endpoints
  static const String huddles = '/huddles';
  
  // Notification endpoints
  static const String notifications = '/notifications';
  
  // Search endpoints
  static const String search = '/search';
  
  // Activity endpoints
  static const String activity = '/activity';
  
  // Health check
  static const String health = '/health';
}
