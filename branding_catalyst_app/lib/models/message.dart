import 'user.dart';

/// Message model matching backend schema
class Message {
  final String id;
  final String content;
  final String contentType;
  final String sender;
  final User? senderDetails;
  final String? channel;
  final String? conversation;
  final String workspace;
  final String? parentMessage;
  final int threadCount;
  final List<String> threadParticipants;
  final DateTime? lastThreadReply;
  final List<Reaction> reactions;
  final List<String> mentions;
  final bool mentionEveryone;
  final bool mentionChannel;
  final List<Attachment> attachments;
  final bool isEdited;
  final DateTime? editedAt;
  final bool isDeleted;
  final bool isPinned;
  final bool isScheduled;
  final DateTime? scheduledFor;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Message({
    required this.id,
    required this.content,
    this.contentType = 'text',
    required this.sender,
    this.senderDetails,
    this.channel,
    this.conversation,
    required this.workspace,
    this.parentMessage,
    this.threadCount = 0,
    this.threadParticipants = const [],
    this.lastThreadReply,
    this.reactions = const [],
    this.mentions = const [],
    this.mentionEveryone = false,
    this.mentionChannel = false,
    this.attachments = const [],
    this.isEdited = false,
    this.editedAt,
    this.isDeleted = false,
    this.isPinned = false,
    this.isScheduled = false,
    this.scheduledFor,
    this.createdAt,
    this.updatedAt,
  });

  factory Message.fromJson(Map<String, dynamic> json) {
    return Message(
      id: json['_id'] ?? json['id'] ?? '',
      content: json['content'] ?? '',
      contentType: json['contentType'] ?? 'text',
      sender: json['sender'] is Map ? json['sender']['_id'] : json['sender'] ?? '',
      senderDetails: json['sender'] is Map ? User.fromJson(json['sender']) : null,
      channel: json['channel'] is Map ? json['channel']['_id'] : json['channel'],
      conversation: json['conversation'] is Map 
          ? json['conversation']['_id'] 
          : json['conversation'],
      workspace: json['workspace'] is Map 
          ? json['workspace']['_id'] 
          : json['workspace'] ?? '',
      parentMessage: json['parentMessage'],
      threadCount: json['threadCount'] ?? 0,
      threadParticipants: (json['threadParticipants'] as List<dynamic>?)
          ?.map((e) => e.toString())
          .toList() ?? [],
      lastThreadReply: json['lastThreadReply'] != null 
          ? DateTime.parse(json['lastThreadReply']) 
          : null,
      reactions: (json['reactions'] as List<dynamic>?)
          ?.map((r) => Reaction.fromJson(r))
          .toList() ?? [],
      mentions: (json['mentions'] as List<dynamic>?)
          ?.map((e) => e.toString())
          .toList() ?? [],
      mentionEveryone: json['mentionEveryone'] ?? false,
      mentionChannel: json['mentionChannel'] ?? false,
      attachments: (json['attachments'] as List<dynamic>?)
          ?.map((a) => Attachment.fromJson(a))
          .toList() ?? [],
      isEdited: json['isEdited'] ?? false,
      editedAt: json['editedAt'] != null 
          ? DateTime.parse(json['editedAt']) 
          : null,
      isDeleted: json['isDeleted'] ?? false,
      isPinned: json['isPinned'] ?? false,
      isScheduled: json['isScheduled'] ?? false,
      scheduledFor: json['scheduledFor'] != null 
          ? DateTime.parse(json['scheduledFor']) 
          : null,
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
      'content': content,
      'contentType': contentType,
      'sender': sender,
      'channel': channel,
      'conversation': conversation,
      'workspace': workspace,
      'parentMessage': parentMessage,
      'threadCount': threadCount,
      'threadParticipants': threadParticipants,
      'lastThreadReply': lastThreadReply?.toIso8601String(),
      'reactions': reactions.map((r) => r.toJson()).toList(),
      'mentions': mentions,
      'mentionEveryone': mentionEveryone,
      'mentionChannel': mentionChannel,
      'attachments': attachments.map((a) => a.toJson()).toList(),
      'isEdited': isEdited,
      'editedAt': editedAt?.toIso8601String(),
      'isDeleted': isDeleted,
      'isPinned': isPinned,
      'isScheduled': isScheduled,
      'scheduledFor': scheduledFor?.toIso8601String(),
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  bool get hasThread => threadCount > 0;
  bool get hasReactions => reactions.isNotEmpty;
  bool get hasAttachments => attachments.isNotEmpty;
}

class Reaction {
  final String emoji;
  final List<String> users;

  Reaction({
    required this.emoji,
    this.users = const [],
  });

  factory Reaction.fromJson(Map<String, dynamic> json) {
    return Reaction(
      emoji: json['emoji'] ?? '',
      users: (json['users'] as List<dynamic>?)
          ?.map((e) => e.toString())
          .toList() ?? [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'emoji': emoji,
      'users': users,
    };
  }

  int get count => users.length;
}

class Attachment {
  final String type;
  final String name;
  final String url;
  final int? size;
  final String? mimeType;
  final String? thumbnail;

  Attachment({
    required this.type,
    required this.name,
    required this.url,
    this.size,
    this.mimeType,
    this.thumbnail,
  });

  factory Attachment.fromJson(Map<String, dynamic> json) {
    return Attachment(
      type: json['type'] ?? 'file',
      name: json['name'] ?? '',
      url: json['url'] ?? '',
      size: json['size'],
      mimeType: json['mimeType'],
      thumbnail: json['thumbnail'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': type,
      'name': name,
      'url': url,
      'size': size,
      'mimeType': mimeType,
      'thumbnail': thumbnail,
    };
  }
}
