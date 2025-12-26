import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/services.dart';
import '../config/api_config.dart';

/// Channel Provider for managing workspaces, channels and messages
class ChannelProvider extends ChangeNotifier {
  final ApiService _apiService = ApiService();
  final SocketService _socketService = SocketService();
  
  // Workspace state
  List<Workspace> _workspaces = [];
  Workspace? _currentWorkspace;
  
  // Channel state
  List<Channel> _channels = [];
  Channel? _currentChannel;
  
  // Message state
  List<Message> _messages = [];
  bool _isLoading = false;
  bool _isLoadingMessages = false;
  String? _error;
  List<String> _typingUsers = [];

  // Getters
  List<Workspace> get workspaces => _workspaces;
  Workspace? get currentWorkspace => _currentWorkspace;
  List<Channel> get channels => _channels;
  Channel? get currentChannel => _currentChannel;
  List<Message> get messages => _messages;
  bool get isLoading => _isLoading;
  bool get isLoadingMessages => _isLoadingMessages;
  String? get error => _error;
  List<String> get typingUsers => _typingUsers;

  List<Channel> get publicChannels => 
      _channels.where((c) => c.type == 'public').toList();
  List<Channel> get privateChannels => 
      _channels.where((c) => c.type == 'private').toList();
  List<Channel> get starredChannels => 
      _channels.where((c) => c.isStarred).toList();
  int get unreadCount => _channels.fold(0, (sum, c) => sum + c.unreadCount);

  /// Initialize socket listeners
  void initSocketListeners() {
    // Socket connection is handled separately after authentication
    
    _socketService.onNewMessage = (message) {
      if (_currentChannel != null && message.channel == _currentChannel!.id) {
        _messages.add(message);
        notifyListeners();
      }
    };

    _socketService.onTypingUpdate = (roomId, users) {
      if (_currentChannel != null && roomId == _currentChannel!.id) {
        _typingUsers = users;
        notifyListeners();
      }
    };

    _socketService.onMessageEdited = (messageId, content) {
      final index = _messages.indexWhere((m) => m.id == messageId);
      if (index != -1) {
        final updatedMessage = Message(
          id: _messages[index].id,
          content: content,
          contentType: _messages[index].contentType,
          sender: _messages[index].sender,
          senderDetails: _messages[index].senderDetails,
          channel: _messages[index].channel,
          workspace: _messages[index].workspace,
          isEdited: true,
          editedAt: DateTime.now(),
          createdAt: _messages[index].createdAt,
        );
        _messages[index] = updatedMessage;
        notifyListeners();
      }
    };

    _socketService.onMessageDeleted = (messageId) {
      _messages.removeWhere((m) => m.id == messageId);
      notifyListeners();
    };
  }

  /// Load workspaces for current user
  Future<void> loadWorkspaces() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.get(ApiConfig.workspaces);
      if (response['success'] == true) {
        _workspaces = (response['workspaces'] as List)
            .map((w) => Workspace.fromJson(w))
            .toList();
        
        // Auto-select first workspace if none selected
        if (_currentWorkspace == null && _workspaces.isNotEmpty) {
          await selectWorkspace(_workspaces.first);
        }
      } else {
        _error = response['message'] ?? 'Failed to load workspaces';
      }
    } catch (e) {
      _error = e.toString();
      debugPrint('Error loading workspaces: $e');
    }

    _isLoading = false;
    notifyListeners();
  }

  /// Select a workspace and load its channels
  Future<void> selectWorkspace(Workspace workspace) async {
    _currentWorkspace = workspace;
    _channels = [];
    _currentChannel = null;
    _messages = [];
    notifyListeners();
    
    await loadChannels(workspace.id);
  }

  /// Load channels for workspace
  Future<void> loadChannels(String workspaceId) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.get('${ApiConfig.channels}?workspace=$workspaceId');
      if (response['success'] == true) {
        _channels = (response['channels'] as List)
            .map((c) => Channel.fromJson(c))
            .toList();
      } else {
        _error = response['message'] ?? 'Failed to load channels';
      }
    } catch (e) {
      _error = e.toString();
      debugPrint('Error loading channels: $e');
    }

    _isLoading = false;
    notifyListeners();
  }

  /// Select a channel and load messages
  Future<void> selectChannel(Channel channel) async {
    if (_currentChannel != null) {
      _socketService.leaveChannel(_currentChannel!.id);
    }

    _currentChannel = channel;
    _messages = [];
    _typingUsers = [];
    notifyListeners();

    _socketService.joinChannel(channel.id);
    await loadMessages();
    
    // Mark as read
    await markChannelAsRead(channel.id);
  }

  /// Load messages for current channel
  Future<void> loadMessages({int limit = 50}) async {
    if (_currentChannel == null) return;

    _isLoadingMessages = true;
    notifyListeners();

    try {
      final response = await _apiService.get(
        '${ApiConfig.channels}/${_currentChannel!.id}/messages?limit=$limit'
      );
      if (response['success'] == true) {
        _messages = (response['messages'] as List)
            .map((m) => Message.fromJson(m))
            .toList();
      }
    } catch (e) {
      _error = e.toString();
      debugPrint('Error loading messages: $e');
    }

    _isLoadingMessages = false;
    notifyListeners();
  }

  /// Send message to current channel
  Future<bool> sendMessage(String content) async {
    if (_currentChannel == null || content.trim().isEmpty) return false;

    try {
      final response = await _apiService.post(
        '${ApiConfig.channels}/${_currentChannel!.id}/messages',
        {
          'content': content,
          'workspace': _currentWorkspace?.id,
        },
      );

      if (response['success'] == true) {
        final message = Message.fromJson(response['message']);
        _messages.add(message);
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    }
  }

  /// Mark channel as read
  Future<void> markChannelAsRead(String channelId) async {
    try {
      await _apiService.put('${ApiConfig.channels}/$channelId/read', {});
      // Update local state
      final index = _channels.indexWhere((c) => c.id == channelId);
      if (index != -1) {
        // Create updated channel with 0 unread
        final updated = Channel(
          id: _channels[index].id,
          name: _channels[index].name,
          displayName: _channels[index].displayName,
          description: _channels[index].description,
          type: _channels[index].type,
          workspace: _channels[index].workspace,
          createdBy: _channels[index].createdBy,
          members: _channels[index].members,
          unreadCount: 0,
          isMember: _channels[index].isMember,
          isStarred: _channels[index].isStarred,
          isMuted: _channels[index].isMuted,
        );
        _channels[index] = updated;
        notifyListeners();
      }
    } catch (e) {
      debugPrint('Error marking as read: $e');
    }
  }

  /// Join a channel
  Future<bool> joinChannel(String channelId) async {
    try {
      final response = await _apiService.post('${ApiConfig.channels}/$channelId/join', {});
      if (response['success'] == true) {
        // Reload channels to get updated membership
        if (_currentWorkspace != null) {
          await loadChannels(_currentWorkspace!.id);
        }
        return true;
      }
      return false;
    } catch (e) {
      _error = e.toString();
      return false;
    }
  }

  /// Leave a channel
  Future<bool> leaveChannel(String channelId) async {
    try {
      final response = await _apiService.post('${ApiConfig.channels}/$channelId/leave', {});
      if (response['success'] == true) {
        if (_currentWorkspace != null) {
          await loadChannels(_currentWorkspace!.id);
        }
        return true;
      }
      return false;
    } catch (e) {
      _error = e.toString();
      return false;
    }
  }

  /// Star/unstar channel
  Future<void> toggleStar(String channelId) async {
    try {
      final response = await _apiService.put('${ApiConfig.channels}/$channelId/star', {});
      if (response['success'] == true) {
        final index = _channels.indexWhere((c) => c.id == channelId);
        if (index != -1) {
          final updated = Channel(
            id: _channels[index].id,
            name: _channels[index].name,
            displayName: _channels[index].displayName,
            description: _channels[index].description,
            type: _channels[index].type,
            workspace: _channels[index].workspace,
            createdBy: _channels[index].createdBy,
            members: _channels[index].members,
            unreadCount: _channels[index].unreadCount,
            isMember: _channels[index].isMember,
            isStarred: response['starred'] ?? !_channels[index].isStarred,
            isMuted: _channels[index].isMuted,
          );
          _channels[index] = updated;
          notifyListeners();
        }
      }
    } catch (e) {
      debugPrint('Error toggling star: $e');
    }
  }

  /// Create new channel
  Future<Channel?> createChannel({
    required String name,
    String? displayName,
    String? description,
    String type = 'public',
  }) async {
    if (_currentWorkspace == null) return null;
    
    _isLoading = true;
    notifyListeners();

    try {
      final response = await _apiService.post(ApiConfig.channels, {
        'workspace': _currentWorkspace!.id,
        'name': name,
        'displayName': displayName ?? name,
        'description': description,
        'type': type,
      });
      
      if (response['success'] == true) {
        final channel = Channel.fromJson(response['channel']);
        _channels.add(channel);
        _isLoading = false;
        notifyListeners();
        return channel;
      }
    } catch (e) {
      _error = e.toString();
    }
    
    _isLoading = false;
    notifyListeners();
    return null;
  }

  /// Send typing indicator
  void sendTyping(bool isTyping) {
    if (_currentChannel != null) {
      _socketService.sendChannelTyping(_currentChannel!.id, isTyping);
    }
  }

  /// Leave current channel
  void leaveCurrentChannel() {
    if (_currentChannel != null) {
      _socketService.leaveChannel(_currentChannel!.id);
      _currentChannel = null;
      _messages = [];
      _typingUsers = [];
      notifyListeners();
    }
  }

  /// Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
