import 'user.dart';

/// Channel model matching backend schema
class Channel {
  final String id;
  final String name;
  final String? displayName;
  final String? description;
  final String? topic;
  final String workspace;
  final String type; // public, private, shared
  final String createdBy;
  final List<ChannelMember> members;
  final bool isArchived;
  final bool isDefault;
  final int messageCount;
  final DateTime? lastActivity;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  
  // Computed properties from API
  final int unreadCount;
  final bool isMember;
  final bool isStarred;
  final bool isMuted;

  Channel({
    required this.id,
    required this.name,
    this.displayName,
    this.description,
    this.topic,
    required this.workspace,
    this.type = 'public',
    required this.createdBy,
    this.members = const [],
    this.isArchived = false,
    this.isDefault = false,
    this.messageCount = 0,
    this.lastActivity,
    this.createdAt,
    this.updatedAt,
    this.unreadCount = 0,
    this.isMember = true,
    this.isStarred = false,
    this.isMuted = false,
  });

  factory Channel.fromJson(Map<String, dynamic> json) {
    return Channel(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? '',
      displayName: json['displayName'],
      description: json['description'],
      topic: json['topic'],
      workspace: json['workspace'] is Map 
          ? json['workspace']['_id'] 
          : json['workspace'] ?? '',
      type: json['type'] ?? 'public',
      createdBy: json['createdBy'] is Map 
          ? json['createdBy']['_id'] 
          : json['createdBy'] ?? '',
      members: (json['members'] as List<dynamic>?)
          ?.map((m) => ChannelMember.fromJson(m))
          .toList() ?? [],
      isArchived: json['isArchived'] ?? false,
      isDefault: json['isDefault'] ?? false,
      messageCount: json['messageCount'] ?? 0,
      lastActivity: json['lastActivity'] != null 
          ? DateTime.parse(json['lastActivity']) 
          : null,
      createdAt: json['createdAt'] != null 
          ? DateTime.parse(json['createdAt']) 
          : null,
      updatedAt: json['updatedAt'] != null 
          ? DateTime.parse(json['updatedAt']) 
          : null,
      unreadCount: json['unreadCount'] ?? 0,
      isMember: json['isMember'] ?? true,
      isStarred: json['isStarred'] ?? false,
      isMuted: json['isMuted'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'displayName': displayName,
      'description': description,
      'topic': topic,
      'workspace': workspace,
      'type': type,
      'createdBy': createdBy,
      'members': members.map((m) => m.toJson()).toList(),
      'isArchived': isArchived,
      'isDefault': isDefault,
      'messageCount': messageCount,
      'lastActivity': lastActivity?.toIso8601String(),
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  bool get isPrivate => type == 'private';
  String get icon => isPrivate ? '🔒' : '#';
}

class ChannelMember {
  final String user;
  final User? userDetails;
  final String role;
  final DateTime? joinedAt;
  final DateTime? lastRead;
  final String notifications;
  final bool starred;
  final bool muted;

  ChannelMember({
    required this.user,
    this.userDetails,
    this.role = 'member',
    this.joinedAt,
    this.lastRead,
    this.notifications = 'all',
    this.starred = false,
    this.muted = false,
  });

  factory ChannelMember.fromJson(Map<String, dynamic> json) {
    return ChannelMember(
      user: json['user'] is Map ? json['user']['_id'] : json['user'] ?? '',
      userDetails: json['user'] is Map ? User.fromJson(json['user']) : null,
      role: json['role'] ?? 'member',
      joinedAt: json['joinedAt'] != null 
          ? DateTime.parse(json['joinedAt']) 
          : null,
      lastRead: json['lastRead'] != null 
          ? DateTime.parse(json['lastRead']) 
          : null,
      notifications: json['notifications'] ?? 'all',
      starred: json['starred'] ?? false,
      muted: json['muted'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'user': user,
      'role': role,
      'joinedAt': joinedAt?.toIso8601String(),
      'lastRead': lastRead?.toIso8601String(),
      'notifications': notifications,
      'starred': starred,
      'muted': muted,
    };
  }
}
