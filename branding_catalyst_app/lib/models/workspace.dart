/// Workspace model
class Workspace {
  final String id;
  final String name;
  final String? description;
  final String? icon;
  final String owner;
  final List<WorkspaceMember> members;
  final bool isDefault;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Workspace({
    required this.id,
    required this.name,
    this.description,
    this.icon,
    required this.owner,
    this.members = const [],
    this.isDefault = false,
    this.createdAt,
    this.updatedAt,
  });

  factory Workspace.fromJson(Map<String, dynamic> json) {
    return Workspace(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? '',
      description: json['description'],
      icon: json['icon'],
      owner: json['owner'] is Map ? json['owner']['_id'] : json['owner'] ?? '',
      members: (json['members'] as List<dynamic>?)
          ?.map((m) => WorkspaceMember.fromJson(m))
          .toList() ?? [],
      isDefault: json['isDefault'] ?? false,
      createdAt: json['createdAt'] != null 
          ? DateTime.parse(json['createdAt']) 
          : null,
      updatedAt: json['updatedAt'] != null 
          ? DateTime.parse(json['updatedAt']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'description': description,
      'icon': icon,
      'owner': owner,
      'members': members.map((m) => m.toJson()).toList(),
      'isDefault': isDefault,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}

class WorkspaceMember {
  final String user;
  final String role;
  final DateTime? joinedAt;

  WorkspaceMember({
    required this.user,
    required this.role,
    this.joinedAt,
  });

  factory WorkspaceMember.fromJson(Map<String, dynamic> json) {
    return WorkspaceMember(
      user: json['user'] is Map ? json['user']['_id'] : json['user'] ?? '',
      role: json['role'] ?? 'member',
      joinedAt: json['joinedAt'] != null 
          ? DateTime.parse(json['joinedAt']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'user': user,
      'role': role,
      'joinedAt': joinedAt?.toIso8601String(),
    };
  }
}
