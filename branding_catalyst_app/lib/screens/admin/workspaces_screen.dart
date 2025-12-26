import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/channel_provider.dart';
import '../../providers/auth_provider.dart';
import '../../models/workspace.dart';
import '../../services/api_service.dart';
import '../../config/api_config.dart';
import '../../theme/app_theme.dart';

class WorkspacesScreen extends StatefulWidget {
  const WorkspacesScreen({super.key});

  @override
  State<WorkspacesScreen> createState() => _WorkspacesScreenState();
}

class _WorkspacesScreenState extends State<WorkspacesScreen> {
  bool _isLoading = false;
  List<Map<String, dynamic>> _workspacesWithMembers = [];

  @override
  void initState() {
    super.initState();
    _loadWorkspaces();
  }

  Future<void> _loadWorkspaces() async {
    setState(() => _isLoading = true);

    try {
      final response = await ApiService().get(ApiConfig.workspaces);
      if (response['success'] == true) {
        final workspaces = response['workspaces'] as List;
        _workspacesWithMembers = [];
        
        // Load members for each workspace
        for (var ws in workspaces) {
          final membersResponse = await ApiService().get('${ApiConfig.workspaces}/${ws['_id']}/members');
          _workspacesWithMembers.add({
            'workspace': Workspace.fromJson(ws),
            'members': membersResponse['success'] == true ? membersResponse['members'] : [],
          });
        }
      }
    } catch (e) {
      debugPrint('Error loading workspaces: $e');
    }

    setState(() => _isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(gradient: AppTheme.backgroundGradient),
        child: SafeArea(
          child: Column(children: [
            _buildHeader(),
            Expanded(
              child: _isLoading
                  ? const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor))
                  : _buildWorkspacesList(),
            ),
          ]),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _showCreateWorkspaceDialog,
        backgroundColor: AppTheme.primaryColor,
        icon: const Icon(Icons.add),
        label: const Text('New Workspace'),
      ),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(children: [
        IconButton(
          onPressed: () => Navigator.pop(context),
          style: IconButton.styleFrom(backgroundColor: AppTheme.surfaceColor, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
          icon: const Icon(Icons.arrow_back, color: AppTheme.textPrimary),
        ),
        const SizedBox(width: 12),
        Container(
          width: 44, height: 44,
          decoration: BoxDecoration(gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(12)),
          child: const Icon(Icons.workspaces_rounded, color: Colors.white, size: 24),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('Workspaces', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
            Text('${_workspacesWithMembers.length} workspaces', style: const TextStyle(fontSize: 13, color: AppTheme.textSecondary)),
          ]),
        ),
        IconButton(
          onPressed: _loadWorkspaces,
          style: IconButton.styleFrom(backgroundColor: AppTheme.surfaceColor, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
          icon: const Icon(Icons.refresh, color: AppTheme.primaryColor),
        ),
      ]),
    );
  }

  Widget _buildWorkspacesList() {
    if (_workspacesWithMembers.isEmpty) {
      return Center(
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Icon(Icons.workspaces_outlined, size: 64, color: AppTheme.textMuted.withOpacity(0.3)),
          const SizedBox(height: 16),
          const Text('No workspaces found', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
          const SizedBox(height: 8),
          Text('Create a workspace to get started', style: TextStyle(color: AppTheme.textSecondary.withOpacity(0.7))),
        ]),
      );
    }

    return RefreshIndicator(
      onRefresh: _loadWorkspaces,
      child: ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        itemCount: _workspacesWithMembers.length,
        itemBuilder: (context, index) => _buildWorkspaceCard(_workspacesWithMembers[index]),
      ),
    );
  }

  Widget _buildWorkspaceCard(Map<String, dynamic> data) {
    final Workspace workspace = data['workspace'];
    final List members = data['members'] ?? [];
    final currentUser = context.read<AuthProvider>().user;
    final isOwner = workspace.owner == currentUser?.id;

    return GestureDetector(
      onTap: () => _showWorkspaceDetails(data),
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(20),
          border: Border.all(color: isOwner ? AppTheme.primaryColor.withOpacity(0.3) : AppTheme.surfaceLight.withOpacity(0.3)),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Container(
              width: 56, height: 56,
              decoration: BoxDecoration(
                gradient: isOwner ? AppTheme.primaryGradient : null,
                color: isOwner ? null : AppTheme.surfaceLight,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Center(child: Text(workspace.icon ?? '🏢', style: const TextStyle(fontSize: 28))),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Expanded(child: Text(workspace.name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AppTheme.textPrimary))),
                  if (isOwner)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(color: AppTheme.primaryColor.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                      child: const Text('Owner', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: AppTheme.primaryColor)),
                    ),
                ]),
                if (workspace.description != null && workspace.description!.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text(workspace.description!, style: TextStyle(fontSize: 13, color: AppTheme.textSecondary.withOpacity(0.7)), maxLines: 1, overflow: TextOverflow.ellipsis),
                ],
              ]),
            ),
          ]),
          const SizedBox(height: 16),
          // Members preview
          Row(children: [
            // Stacked avatars
            SizedBox(
              width: 80, height: 32,
              child: Stack(children: [
                for (int i = 0; i < (members.length > 3 ? 3 : members.length); i++)
                  Positioned(
                    left: i * 20.0,
                    child: Container(
                      width: 32, height: 32,
                      decoration: BoxDecoration(
                        gradient: AppTheme.primaryGradient,
                        border: Border.all(color: AppTheme.backgroundCard, width: 2),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Center(
                        child: Text(
                          _getInitials(members[i]['user']?['name'] ?? '?'),
                          style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  ),
              ]),
            ),
            const SizedBox(width: 8),
            Text('${members.length} members', style: TextStyle(fontSize: 13, color: AppTheme.textSecondary.withOpacity(0.7))),
            const Spacer(),
            Icon(Icons.chevron_right, color: AppTheme.textMuted.withOpacity(0.5)),
          ]),
        ]),
      ),
    );
  }

  String _getInitials(String name) {
    final parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
    }
    return name.isNotEmpty ? name[0].toUpperCase() : '?';
  }

  void _showWorkspaceDetails(Map<String, dynamic> data) {
    final Workspace workspace = data['workspace'];
    final List members = data['members'] ?? [];

    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.7, minChildSize: 0.5, maxChildSize: 0.95,
        expand: false,
        builder: (context, scrollController) => SingleChildScrollView(
          controller: scrollController,
          padding: const EdgeInsets.all(24),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
            const SizedBox(height: 24),
            // Header
            Row(children: [
              Container(
                width: 64, height: 64,
                decoration: BoxDecoration(gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(16)),
                child: Center(child: Text(workspace.icon ?? '🏢', style: const TextStyle(fontSize: 32))),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(workspace.name, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
                  if (workspace.description != null)
                    Text(workspace.description!, style: const TextStyle(fontSize: 13, color: AppTheme.textSecondary)),
                ]),
              ),
            ]),
            const SizedBox(height: 24),
            // Stats
            Row(children: [
              _buildStatCard('Members', '${members.length}', Icons.people),
              const SizedBox(width: 12),
              Consumer<ChannelProvider>(
                builder: (context, provider, _) {
                  final channelCount = provider.channels.length;
                  return _buildStatCard('Channels', '$channelCount', Icons.tag);
                },
              ),
            ]),
            const SizedBox(height: 24),
            // Members List
            Row(children: [
              const Text('Members', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
              const Spacer(),
              TextButton.icon(
                onPressed: () => _showAddMemberDialog(workspace.id),
                icon: const Icon(Icons.person_add, size: 18),
                label: const Text('Add'),
              ),
            ]),
            const SizedBox(height: 12),
            ...members.map((m) => _buildMemberTile(m, workspace.id)).toList(),
          ]),
        ),
      ),
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(14)),
        child: Row(children: [
          Container(
            width: 40, height: 40,
            decoration: BoxDecoration(color: AppTheme.primaryColor.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
            child: Icon(icon, color: AppTheme.primaryColor, size: 20),
          ),
          const SizedBox(width: 12),
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
            Text(label, style: TextStyle(fontSize: 12, color: AppTheme.textSecondary.withOpacity(0.7))),
          ]),
        ]),
      ),
    );
  }

  Widget _buildMemberTile(Map<String, dynamic> memberData, String workspaceId) {
    final user = memberData['user'] ?? {};
    final role = memberData['role'] ?? 'member';
    final status = memberData['status'] ?? {};
    final isOnline = status['online'] == 'online';

    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(12)),
      child: Row(children: [
        Stack(children: [
          Container(
            width: 44, height: 44,
            decoration: BoxDecoration(gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(12)),
            child: Center(child: Text(_getInitials(user['name'] ?? '?'), style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
          ),
          Positioned(
            right: 0, bottom: 0,
            child: Container(
              width: 14, height: 14,
              decoration: BoxDecoration(
                color: isOnline ? AppTheme.online : AppTheme.offline,
                shape: BoxShape.circle,
                border: Border.all(color: AppTheme.surfaceColor, width: 2),
              ),
            ),
          ),
        ]),
        const SizedBox(width: 12),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(user['name'] ?? 'Unknown', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
            Text(user['email'] ?? '', style: TextStyle(fontSize: 12, color: AppTheme.textSecondary.withOpacity(0.7))),
          ]),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color: role == 'owner' ? AppTheme.warning.withOpacity(0.15) : role == 'admin' ? AppTheme.info.withOpacity(0.15) : AppTheme.surfaceLight,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(role.toString().toUpperCase(), style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: role == 'owner' ? AppTheme.warning : role == 'admin' ? AppTheme.info : AppTheme.textMuted)),
        ),
      ]),
    );
  }

  void _showCreateWorkspaceDialog() {
    final nameController = TextEditingController();
    final descController = TextEditingController();

    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => Padding(
        padding: EdgeInsets.only(left: 24, right: 24, top: 24, bottom: MediaQuery.of(context).viewInsets.bottom + 24),
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
          const SizedBox(height: 24),
          const Text('Create Workspace', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
          const SizedBox(height: 24),
          TextField(
            controller: nameController,
            style: const TextStyle(color: AppTheme.textPrimary),
            decoration: InputDecoration(
              labelText: 'Workspace Name', prefixIcon: const Icon(Icons.workspaces, size: 20),
              filled: true, fillColor: AppTheme.surfaceColor,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: descController,
            style: const TextStyle(color: AppTheme.textPrimary),
            maxLines: 2,
            decoration: InputDecoration(
              labelText: 'Description (optional)', prefixIcon: const Icon(Icons.description, size: 20),
              filled: true, fillColor: AppTheme.surfaceColor,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
            ),
          ),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity, height: 52,
            child: ElevatedButton(
              onPressed: () async {
                if (nameController.text.trim().isEmpty) return;
                Navigator.pop(context);
                
                try {
                  final response = await ApiService().post(ApiConfig.workspaces, {
                    'name': nameController.text.trim(),
                    'description': descController.text.trim().isNotEmpty ? descController.text.trim() : null,
                  });
                  
                  if (response['success'] == true && mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Workspace created!'), backgroundColor: AppTheme.success));
                    _loadWorkspaces();
                  }
                } catch (e) {
                  if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error));
                  }
                }
              },
              child: const Text('Create Workspace', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            ),
          ),
        ]),
      ),
    );
  }

  void _showAddMemberDialog(String workspaceId) {
    final emailController = TextEditingController();

    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => Padding(
        padding: EdgeInsets.only(left: 24, right: 24, top: 24, bottom: MediaQuery.of(context).viewInsets.bottom + 24),
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
          const SizedBox(height: 24),
          const Text('Add Member', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
          const SizedBox(height: 8),
          Text('Search for a user by email', style: TextStyle(color: AppTheme.textSecondary.withOpacity(0.7))),
          const SizedBox(height: 24),
          TextField(
            controller: emailController,
            style: const TextStyle(color: AppTheme.textPrimary),
            decoration: InputDecoration(
              labelText: 'User Email', prefixIcon: const Icon(Icons.email, size: 20),
              filled: true, fillColor: AppTheme.surfaceColor,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
            ),
          ),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity, height: 52,
            child: ElevatedButton(
              onPressed: () async {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Member invite feature coming soon'), backgroundColor: AppTheme.info));
              },
              child: const Text('Add Member', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            ),
          ),
        ]),
      ),
    );
  }
}
