import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/channel_provider.dart';
import '../../models/channel.dart';
import '../../models/message.dart';
import '../../theme/app_theme.dart';
import '../../theme/time_theme.dart';

class ChannelsScreen extends StatefulWidget {
  const ChannelsScreen({super.key});

  @override
  State<ChannelsScreen> createState() => _ChannelsScreenState();
}

class _ChannelsScreenState extends State<ChannelsScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _selectedFilter = 'all';

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  void _loadData() {
    final provider = context.read<ChannelProvider>();
    if (provider.workspaces.isEmpty) {
      provider.loadWorkspaces();
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          _buildHeader(),
          _buildSearchBar(),
          _buildFilterChips(),
          Expanded(child: _buildChannelsList()),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    final theme = TimeTheme.current;
    return Consumer<ChannelProvider>(
      builder: (context, provider, _) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [
              Container(
                width: 44, height: 44,
                decoration: BoxDecoration(gradient: theme.cardGradient, borderRadius: BorderRadius.circular(12)),
                child: const Icon(Icons.tag_rounded, color: Colors.white, size: 24),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  const Text('Channels', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
                  Text(
                    provider.currentWorkspace?.name ?? 'Select a workspace',
                    style: const TextStyle(fontSize: 13, color: AppTheme.textSecondary),
                  ),
                ]),
              ),
              IconButton(
                onPressed: _loadData,
                style: IconButton.styleFrom(backgroundColor: AppTheme.surfaceColor, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                icon: Icon(Icons.refresh, color: theme.primaryColor),
              ),
              const SizedBox(width: 8),
              IconButton(
                onPressed: _showCreateChannelDialog,
                style: IconButton.styleFrom(backgroundColor: theme.primaryColor, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                icon: const Icon(Icons.add, color: Colors.white),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildSearchBar() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(14)),
        child: TextField(
          controller: _searchController,
          style: const TextStyle(color: AppTheme.textPrimary),
          decoration: InputDecoration(
            hintText: 'Search channels...',
            hintStyle: TextStyle(color: AppTheme.textMuted.withOpacity(0.5)),
            prefixIcon: const Icon(Icons.search, color: AppTheme.textMuted),
            border: InputBorder.none,
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          ),
          onChanged: (value) => setState(() {}),
        ),
      ),
    );
  }

  Widget _buildFilterChips() {
    final filters = [
      {'id': 'all', 'label': 'All', 'icon': Icons.grid_view_rounded},
      {'id': 'public', 'label': 'Public', 'icon': Icons.public_rounded},
      {'id': 'private', 'label': 'Private', 'icon': Icons.lock_rounded},
      {'id': 'starred', 'label': 'Starred', 'icon': Icons.star_rounded},
    ];

    return Container(
      height: 56, margin: const EdgeInsets.symmetric(vertical: 16),
      child: ListView.separated(
        scrollDirection: Axis.horizontal, padding: const EdgeInsets.symmetric(horizontal: 20),
        itemCount: filters.length, separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final filter = filters[index];
          final isSelected = _selectedFilter == filter['id'];
          return GestureDetector(
            onTap: () => setState(() => _selectedFilter = filter['id'] as String),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                color: isSelected ? AppTheme.primaryColor : AppTheme.surfaceColor,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(children: [
                Icon(filter['icon'] as IconData, color: isSelected ? Colors.white : AppTheme.textMuted, size: 18),
                const SizedBox(width: 8),
                Text(filter['label'] as String, style: TextStyle(color: isSelected ? Colors.white : AppTheme.textSecondary, fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal)),
              ]),
            ),
          );
        },
      ),
    );
  }

  Widget _buildChannelsList() {
    return Consumer<ChannelProvider>(
      builder: (context, provider, _) {
        if (provider.isLoading) {
          return const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor));
        }

        if (provider.error != null) {
          return Center(
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Icon(Icons.error_outline, size: 64, color: AppTheme.error.withOpacity(0.5)),
              const SizedBox(height: 16),
              Text('Error loading channels', style: TextStyle(fontSize: 16, color: AppTheme.textSecondary)),
              const SizedBox(height: 8),
              TextButton(onPressed: _loadData, child: const Text('Retry')),
            ]),
          );
        }

        // Filter channels
        List<Channel> channels = provider.channels;
        
        // Apply filter
        if (_selectedFilter == 'public') {
          channels = provider.publicChannels;
        } else if (_selectedFilter == 'private') {
          channels = provider.privateChannels;
        } else if (_selectedFilter == 'starred') {
          channels = provider.starredChannels;
        }

        // Apply search
        if (_searchController.text.isNotEmpty) {
          channels = channels.where((ch) => 
            ch.name.toLowerCase().contains(_searchController.text.toLowerCase()) ||
            (ch.displayName?.toLowerCase().contains(_searchController.text.toLowerCase()) ?? false)
          ).toList();
        }

        if (channels.isEmpty) {
          return Center(
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Icon(Icons.tag_rounded, size: 64, color: AppTheme.textMuted.withOpacity(0.3)),
              const SizedBox(height: 16),
              const Text('No channels found', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
              const SizedBox(height: 8),
              Text(
                provider.workspaces.isEmpty 
                    ? 'Create or join a workspace first' 
                    : 'Create a new channel to get started',
                style: TextStyle(fontSize: 14, color: AppTheme.textSecondary.withOpacity(0.7)),
              ),
            ]),
          );
        }

        return RefreshIndicator(
          onRefresh: () async {
            if (provider.currentWorkspace != null) {
              await provider.loadChannels(provider.currentWorkspace!.id);
            }
          },
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            itemCount: channels.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (context, index) => _buildChannelCard(channels[index]),
          ),
        );
      },
    );
  }

  Widget _buildChannelCard(Channel channel) {
    final isPrivate = channel.type == 'private';
    return GestureDetector(
      onTap: () => _navigateToChannel(channel),
      onLongPress: () => _showChannelOptions(channel),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppTheme.backgroundCard,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: channel.unreadCount > 0 ? AppTheme.primaryColor.withOpacity(0.5) : AppTheme.surfaceLight.withOpacity(0.3)),
        ),
        child: Row(
          children: [
            Container(
              width: 48, height: 48,
              decoration: BoxDecoration(
                color: isPrivate ? AppTheme.warning.withOpacity(0.15) : AppTheme.primaryColor.withOpacity(0.15),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: Text(
                  isPrivate ? '🔒' : '#',
                  style: TextStyle(fontSize: isPrivate ? 20 : 24, color: isPrivate ? AppTheme.warning : AppTheme.primaryColor),
                ),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  if (channel.isStarred) const Icon(Icons.star, size: 14, color: AppTheme.warning),
                  if (channel.isStarred) const SizedBox(width: 4),
                  Expanded(
                    child: Text(
                      '#${channel.displayName ?? channel.name}',
                      style: TextStyle(fontSize: 16, fontWeight: channel.unreadCount > 0 ? FontWeight.bold : FontWeight.w600, color: AppTheme.textPrimary),
                    ),
                  ),
                ]),
                if (channel.description != null && channel.description!.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text(channel.description!, style: TextStyle(fontSize: 13, color: AppTheme.textSecondary.withOpacity(0.7)), maxLines: 1, overflow: TextOverflow.ellipsis),
                ],
                const SizedBox(height: 8),
                Row(children: [
                  Icon(Icons.people_outline, size: 14, color: AppTheme.textMuted.withOpacity(0.7)),
                  const SizedBox(width: 4),
                  Text('${channel.members.length} members', style: TextStyle(fontSize: 12, color: AppTheme.textMuted.withOpacity(0.7))),
                ]),
              ]),
            ),
            if (channel.unreadCount > 0)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: AppTheme.primaryColor, borderRadius: BorderRadius.circular(12)),
                child: Text('${channel.unreadCount}', style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
              ),
          ],
        ),
      ),
    );
  }

  void _navigateToChannel(Channel channel) {
    context.read<ChannelProvider>().selectChannel(channel);
    Navigator.push(context, MaterialPageRoute(builder: (_) => ChannelChatScreen(channel: channel)));
  }

  void _showChannelOptions(Channel channel) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => Padding(
        padding: const EdgeInsets.all(24),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2))),
          const SizedBox(height: 24),
          Text('#${channel.displayName ?? channel.name}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
          const SizedBox(height: 24),
          ListTile(
            leading: Icon(channel.isStarred ? Icons.star : Icons.star_outline, color: AppTheme.warning),
            title: Text(channel.isStarred ? 'Unstar' : 'Star', style: const TextStyle(color: AppTheme.textPrimary)),
            onTap: () {
              Navigator.pop(context);
              context.read<ChannelProvider>().toggleStar(channel.id);
            },
          ),
          if (!channel.isDefault)
            ListTile(
              leading: const Icon(Icons.exit_to_app, color: AppTheme.error),
              title: const Text('Leave channel', style: TextStyle(color: AppTheme.error)),
              onTap: () {
                Navigator.pop(context);
                context.read<ChannelProvider>().leaveChannel(channel.id);
              },
            ),
        ]),
      ),
    );
  }

  void _showCreateChannelDialog() {
    final nameController = TextEditingController();
    final descController = TextEditingController();
    bool isPrivate = false;

    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => StatefulBuilder(
        builder: (context, setModalState) => Padding(
          padding: EdgeInsets.only(left: 24, right: 24, top: 24, bottom: MediaQuery.of(context).viewInsets.bottom + 24),
          child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
            const SizedBox(height: 24),
            const Text('Create Channel', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
            const SizedBox(height: 24),
            TextField(
              controller: nameController, style: const TextStyle(color: AppTheme.textPrimary),
              decoration: InputDecoration(
                labelText: 'Channel Name', hintText: 'e.g., marketing', prefixText: '# ',
                prefixStyle: const TextStyle(color: AppTheme.primaryColor),
                filled: true, fillColor: AppTheme.surfaceColor,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: descController, style: const TextStyle(color: AppTheme.textPrimary), maxLines: 2,
              decoration: InputDecoration(
                labelText: 'Description (optional)', hintText: 'What is this channel about?',
                filled: true, fillColor: AppTheme.surfaceColor,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
              ),
            ),
            const SizedBox(height: 16),
            Row(children: [
              const Text('Make private', style: TextStyle(fontSize: 16, color: AppTheme.textPrimary)),
              const Spacer(),
              Switch(value: isPrivate, onChanged: (val) => setModalState(() => isPrivate = val), activeColor: AppTheme.primaryColor),
            ]),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity, height: 52,
              child: ElevatedButton(
                onPressed: () async {
                  if (nameController.text.trim().isEmpty) return;
                  Navigator.pop(context);
                  await context.read<ChannelProvider>().createChannel(
                    name: nameController.text.trim(),
                    displayName: nameController.text.trim(),
                    description: descController.text.trim().isNotEmpty ? descController.text.trim() : null,
                    type: isPrivate ? 'private' : 'public',
                  );
                },
                child: const Text('Create Channel', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
              ),
            ),
          ]),
        ),
      ),
    );
  }
}

/// Channel Chat Screen - Real-time messaging
class ChannelChatScreen extends StatefulWidget {
  final Channel channel;
  const ChannelChatScreen({super.key, required this.channel});

  @override
  State<ChannelChatScreen> createState() => _ChannelChatScreenState();
}

class _ChannelChatScreenState extends State<ChannelChatScreen> {
  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _sendMessage() async {
    final content = _messageController.text.trim();
    if (content.isEmpty) return;
    
    _messageController.clear();
    await context.read<ChannelProvider>().sendMessage(content);
    
    // Scroll to bottom
    if (_scrollController.hasClients) {
      _scrollController.animateTo(
        _scrollController.position.maxScrollExtent + 100,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(gradient: AppTheme.backgroundGradient),
        child: SafeArea(
          child: Column(children: [
            _buildHeader(),
            Expanded(child: _buildMessagesList()),
            _buildMessageInput(),
          ]),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.backgroundCard,
        border: Border(bottom: BorderSide(color: AppTheme.surfaceLight.withOpacity(0.3))),
      ),
      child: Row(children: [
        IconButton(
          onPressed: () {
            context.read<ChannelProvider>().leaveCurrentChannel();
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back, color: AppTheme.textPrimary),
        ),
        Container(
          width: 40, height: 40,
          decoration: BoxDecoration(color: AppTheme.primaryColor.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
          child: const Center(child: Text('#', style: TextStyle(fontSize: 20, color: AppTheme.primaryColor, fontWeight: FontWeight.bold))),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('#${widget.channel.displayName ?? widget.channel.name}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
            Text('${widget.channel.members.length} members', style: TextStyle(fontSize: 12, color: AppTheme.textMuted.withOpacity(0.7))),
          ]),
        ),
        IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert, color: AppTheme.textMuted)),
      ]),
    );
  }

  Widget _buildMessagesList() {
    return Consumer<ChannelProvider>(
      builder: (context, provider, _) {
        if (provider.isLoadingMessages) {
          return const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor));
        }

        if (provider.messages.isEmpty) {
          return Center(
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Icon(Icons.chat_bubble_outline, size: 64, color: AppTheme.textMuted.withOpacity(0.3)),
              const SizedBox(height: 16),
              const Text('No messages yet', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
              const SizedBox(height: 8),
              Text('Be the first to say something!', style: TextStyle(fontSize: 14, color: AppTheme.textSecondary.withOpacity(0.7))),
            ]),
          );
        }

        return ListView.builder(
          controller: _scrollController,
          padding: const EdgeInsets.all(16),
          itemCount: provider.messages.length,
          itemBuilder: (context, index) {
            final message = provider.messages[index];
            return _buildMessageBubble(message);
          },
        );
      },
    );
  }

  Widget _buildMessageBubble(Message message) {
    final isMe = message.senderDetails?.id == context.read<ChannelProvider>().currentWorkspace?.id; // TODO: Compare with current user
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(
          width: 36, height: 36,
          decoration: BoxDecoration(gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(10)),
          child: Center(
            child: Text(
              message.senderDetails?.name.isNotEmpty == true ? message.senderDetails!.name[0].toUpperCase() : '?',
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Text(message.senderDetails?.name ?? 'Unknown', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
              const SizedBox(width: 8),
              Text(_formatTime(message.createdAt), style: TextStyle(fontSize: 11, color: AppTheme.textMuted.withOpacity(0.7))),
              if (message.isEdited) Text(' (edited)', style: TextStyle(fontSize: 10, color: AppTheme.textMuted.withOpacity(0.5))),
            ]),
            const SizedBox(height: 4),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(12)),
              child: Text(message.content, style: const TextStyle(fontSize: 14, color: AppTheme.textPrimary)),
            ),
          ]),
        ),
      ]),
    );
  }

  String _formatTime(DateTime? time) {
    if (time == null) return '';
    final now = DateTime.now();
    final diff = now.difference(time);
    if (diff.inMinutes < 1) return 'Just now';
    if (diff.inHours < 1) return '${diff.inMinutes}m ago';
    if (diff.inDays < 1) return '${diff.inHours}h ago';
    return '${time.day}/${time.month}';
  }

  Widget _buildMessageInput() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.backgroundCard,
        border: Border(top: BorderSide(color: AppTheme.surfaceLight.withOpacity(0.3))),
      ),
      child: Row(children: [
        IconButton(onPressed: () {}, icon: const Icon(Icons.add_circle_outline, color: AppTheme.textMuted)),
        Expanded(
          child: Container(
            decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(24)),
            child: TextField(
              controller: _messageController,
              style: const TextStyle(color: AppTheme.textPrimary),
              decoration: InputDecoration(
                hintText: 'Message #${widget.channel.displayName ?? widget.channel.name}',
                hintStyle: TextStyle(color: AppTheme.textMuted.withOpacity(0.5)),
                border: InputBorder.none,
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              ),
              onSubmitted: (_) => _sendMessage(),
            ),
          ),
        ),
        const SizedBox(width: 8),
        Container(
          decoration: BoxDecoration(gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(24)),
          child: IconButton(onPressed: _sendMessage, icon: const Icon(Icons.send_rounded, color: Colors.white)),
        ),
      ]),
    );
  }
}
