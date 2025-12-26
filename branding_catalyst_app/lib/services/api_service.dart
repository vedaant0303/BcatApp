import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../config/api_config.dart';
import '../models/models.dart';

/// API Service for all HTTP requests
class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  String? _token;

  // Get headers with auth token
  Map<String, String> get _headers => {
    'Content-Type': 'application/json',
    if (_token != null) 'Authorization': 'Bearer $_token',
  };

  // Initialize token from storage
  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('auth_token');
  }

  // Set auth token
  Future<void> setToken(String token) async {
    _token = token;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
  }

  // Clear auth token
  Future<void> clearToken() async {
    _token = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
  }

  // Get token
  String? get token => _token;
  bool get isAuthenticated => _token != null;

  // Generic GET request
  Future<Map<String, dynamic>> get(String endpoint) async {
    try {
      final response = await http.get(
        Uri.parse('${ApiConfig.baseUrl}$endpoint'),
        headers: _headers,
      );
      return _handleResponse(response);
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // Generic POST request
  Future<Map<String, dynamic>> post(String endpoint, Map<String, dynamic> data) async {
    try {
      final response = await http.post(
        Uri.parse('${ApiConfig.baseUrl}$endpoint'),
        headers: _headers,
        body: jsonEncode(data),
      );
      return _handleResponse(response);
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // Generic PUT request
  Future<Map<String, dynamic>> put(String endpoint, Map<String, dynamic> data) async {
    try {
      final response = await http.put(
        Uri.parse('${ApiConfig.baseUrl}$endpoint'),
        headers: _headers,
        body: jsonEncode(data),
      );
      return _handleResponse(response);
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // Generic DELETE request
  Future<Map<String, dynamic>> delete(String endpoint) async {
    try {
      final response = await http.delete(
        Uri.parse('${ApiConfig.baseUrl}$endpoint'),
        headers: _headers,
      );
      return _handleResponse(response);
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // Handle API response
  Map<String, dynamic> _handleResponse(http.Response response) {
    final data = jsonDecode(response.body);
    
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return data;
    } else if (response.statusCode == 401) {
      clearToken();
      throw Exception(data['message'] ?? 'Unauthorized');
    } else {
      throw Exception(data['message'] ?? 'Request failed');
    }
  }

  // ============ AUTH ENDPOINTS ============
  
  /// Login with employee ID and password
  Future<Map<String, dynamic>> login(String employeeId, String password) async {
    final response = await post(ApiConfig.login, {
      'employeeId': employeeId,
      'password': password,
    });
    
    if (response['success'] == true && response['token'] != null) {
      await setToken(response['token']);
    }
    
    return response;
  }

  /// Get current user
  Future<User?> getCurrentUser() async {
    try {
      final response = await get(ApiConfig.me);
      if (response['success'] == true && response['user'] != null) {
        return User.fromJson(response['user']);
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  /// Logout
  Future<void> logout() async {
    await clearToken();
  }

  // ============ USER ENDPOINTS ============
  
  /// Get all users
  Future<List<User>> getUsers() async {
    final response = await get(ApiConfig.users);
    if (response['success'] == true && response['users'] != null) {
      return (response['users'] as List)
          .map((user) => User.fromJson(user))
          .toList();
    }
    return [];
  }

  /// Get user by ID
  Future<User?> getUser(String id) async {
    final response = await get('${ApiConfig.users}/$id');
    if (response['success'] == true && response['user'] != null) {
      return User.fromJson(response['user']);
    }
    return null;
  }

  // ============ WORKSPACE ENDPOINTS ============
  
  /// Get all workspaces
  Future<List<Workspace>> getWorkspaces() async {
    final response = await get(ApiConfig.workspaces);
    if (response['success'] == true && response['workspaces'] != null) {
      return (response['workspaces'] as List)
          .map((ws) => Workspace.fromJson(ws))
          .toList();
    }
    return [];
  }

  /// Get workspace by ID
  Future<Workspace?> getWorkspace(String id) async {
    final response = await get('${ApiConfig.workspaces}/$id');
    if (response['success'] == true && response['workspace'] != null) {
      return Workspace.fromJson(response['workspace']);
    }
    return null;
  }

  // ============ CHANNEL ENDPOINTS ============
  
  /// Get channels for a workspace
  Future<List<Channel>> getChannels(String workspaceId) async {
    final response = await get('${ApiConfig.channels}?workspace=$workspaceId');
    if (response['success'] == true && response['channels'] != null) {
      return (response['channels'] as List)
          .map((ch) => Channel.fromJson(ch))
          .toList();
    }
    return [];
  }

  /// Get channel by ID
  Future<Channel?> getChannel(String id) async {
    final response = await get('${ApiConfig.channels}/$id');
    if (response['success'] == true && response['channel'] != null) {
      return Channel.fromJson(response['channel']);
    }
    return null;
  }

  /// Create channel
  Future<Channel?> createChannel(Map<String, dynamic> data) async {
    final response = await post(ApiConfig.channels, data);
    if (response['success'] == true && response['channel'] != null) {
      return Channel.fromJson(response['channel']);
    }
    return null;
  }

  // ============ MESSAGE ENDPOINTS ============
  
  /// Get messages for a channel
  Future<List<Message>> getChannelMessages(String channelId, {int limit = 50}) async {
    final response = await get('${ApiConfig.messages}?channel=$channelId&limit=$limit');
    if (response['success'] == true && response['messages'] != null) {
      return (response['messages'] as List)
          .map((msg) => Message.fromJson(msg))
          .toList();
    }
    return [];
  }

  /// Send message
  Future<Message?> sendMessage(Map<String, dynamic> data) async {
    final response = await post(ApiConfig.messages, data);
    if (response['success'] == true && response['message'] != null) {
      return Message.fromJson(response['message']);
    }
    return null;
  }

  // ============ TASK ENDPOINTS ============
  
  /// Get user's tasks
  Future<List<Task>> getTasks({String? status}) async {
    String endpoint = ApiConfig.tasks;
    if (status != null) {
      endpoint += '?status=$status';
    }
    final response = await get(endpoint);
    if (response['success'] == true && response['tasks'] != null) {
      return (response['tasks'] as List)
          .map((task) => Task.fromJson(task))
          .toList();
    }
    return [];
  }

  /// Get task by ID
  Future<Task?> getTask(String id) async {
    final response = await get('${ApiConfig.tasks}/$id');
    if (response['success'] == true && response['task'] != null) {
      return Task.fromJson(response['task']);
    }
    return null;
  }

  /// Update task status
  Future<Task?> updateTaskStatus(String id, String status) async {
    final response = await put('${ApiConfig.tasks}/$id', {'status': status});
    if (response['success'] == true && response['task'] != null) {
      return Task.fromJson(response['task']);
    }
    return null;
  }

  // ============ NOTIFICATION ENDPOINTS ============
  
  /// Get notifications
  Future<List<Map<String, dynamic>>> getNotifications() async {
    final response = await get(ApiConfig.notifications);
    if (response['success'] == true && response['notifications'] != null) {
      return List<Map<String, dynamic>>.from(response['notifications']);
    }
    return [];
  }

  /// Mark notification as read
  Future<void> markNotificationRead(String id) async {
    await put('${ApiConfig.notifications}/$id/read', {});
  }

  // ============ HEALTH CHECK ============
  
  /// Check API health
  Future<bool> checkHealth() async {
    try {
      final response = await get(ApiConfig.health);
      return response['status'] == 'OK';
    } catch (e) {
      return false;
    }
  }
}
