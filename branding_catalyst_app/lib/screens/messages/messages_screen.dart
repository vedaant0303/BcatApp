import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';

class MessagesScreen extends StatefulWidget {
  const MessagesScreen({super.key});

  @override
  State<MessagesScreen> createState() => _MessagesScreenState();
}

class _MessagesScreenState extends State<MessagesScreen> {
  final TextEditingController _searchController = TextEditingController();
  final List<Map<String, dynamic>> _conversations = [
    {'name': 'John Doe', 'avatar': 'JD', 'lastMessage': 'Sure, I\'ll send it over!', 'time': '2m ago', 'unread': 3, 'online': true},
    {'name': 'Sarah Miller', 'avatar': 'SM', 'lastMessage': 'Meeting is rescheduled to 3 PM', 'time': '15m ago', 'unread': 1, 'online': true},
    {'name': 'Mike Robinson', 'avatar': 'MR', 'lastMessage': 'Great work on the presentation! 👏', 'time': '1h ago', 'unread': 0, 'online': false},
    {'name': 'Emily Chen', 'avatar': 'EC', 'lastMessage': 'Can you review this document?', 'time': '2h ago', 'unread': 0, 'online': true},
  ];

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          _buildHeader(), _buildSearchBar(),
          Expanded(child: _buildConversationsList()),
        ],
      ),
    );
  }

  Widget _buildHeader() => Padding(
    padding: const EdgeInsets.all(20),
    child: Row(children: [
      Container(width: 44, height: 44, decoration: BoxDecoration(gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(12)),
        child: const Icon(Icons.chat_bubble_rounded, color: Colors.white, size: 22)),
      const SizedBox(width: 12),
      const Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('Messages', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
        Text('Direct messages', style: TextStyle(fontSize: 13, color: AppTheme.textSecondary)),
      ])),
    ]),
  );

  Widget _buildSearchBar() => Padding(
    padding: const EdgeInsets.symmetric(horizontal: 20),
    child: Container(
      decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(14)),
      child: TextField(controller: _searchController, style: const TextStyle(color: AppTheme.textPrimary),
        decoration: InputDecoration(hintText: 'Search messages...', prefixIcon: const Icon(Icons.search, color: AppTheme.textMuted), border: InputBorder.none)),
    ),
  );

  Widget _buildConversationsList() => ListView.separated(
    padding: const EdgeInsets.all(20), itemCount: _conversations.length,
    separatorBuilder: (_, __) => const SizedBox(height: 8),
    itemBuilder: (context, index) => _buildConversationCard(_conversations[index]),
  );

  Widget _buildConversationCard(Map<String, dynamic> conv) {
    final hasUnread = (conv['unread'] as int) > 0;
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: hasUnread ? AppTheme.primaryColor.withOpacity(0.08) : AppTheme.backgroundCard, borderRadius: BorderRadius.circular(16)),
      child: Row(children: [
        Stack(children: [
          Container(width: 52, height: 52, decoration: BoxDecoration(gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(14)),
            child: Center(child: Text(conv['avatar'], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)))),
          if (conv['online']) Positioned(right: 0, bottom: 0, child: Container(width: 14, height: 14, decoration: BoxDecoration(color: AppTheme.online, shape: BoxShape.circle, border: Border.all(color: AppTheme.backgroundCard, width: 2)))),
        ]),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [Expanded(child: Text(conv['name'], style: TextStyle(fontSize: 15, fontWeight: hasUnread ? FontWeight.bold : FontWeight.w600, color: AppTheme.textPrimary))), Text(conv['time'], style: TextStyle(fontSize: 12, color: AppTheme.textMuted))]),
          const SizedBox(height: 4),
          Row(children: [Expanded(child: Text(conv['lastMessage'], style: TextStyle(fontSize: 13, color: AppTheme.textSecondary), maxLines: 1, overflow: TextOverflow.ellipsis)),
            if (hasUnread) Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: AppTheme.primaryColor, borderRadius: BorderRadius.circular(10)),
              child: Text('${conv['unread']}', style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)))]),
        ])),
      ]),
    );
  }
}
