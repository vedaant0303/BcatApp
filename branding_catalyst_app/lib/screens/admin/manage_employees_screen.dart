import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/employee_provider.dart';
import '../../providers/auth_provider.dart';
import '../../models/user.dart';
import '../../theme/app_theme.dart';

class ManageEmployeesScreen extends StatefulWidget {
  const ManageEmployeesScreen({super.key});

  @override
  State<ManageEmployeesScreen> createState() => _ManageEmployeesScreenState();
}

class _ManageEmployeesScreenState extends State<ManageEmployeesScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _selectedFilter = 'all';

  @override
  void initState() {
    super.initState();
    _loadEmployees();
  }

  void _loadEmployees() {
    context.read<EmployeeProvider>().loadEmployees();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Check if user is admin
    final user = context.watch<AuthProvider>().user;
    if (user?.role != 'admin') {
      return Scaffold(
        body: Container(
          decoration: const BoxDecoration(gradient: AppTheme.backgroundGradient),
          child: Center(
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              const Icon(Icons.lock_outline, size: 64, color: AppTheme.error),
              const SizedBox(height: 16),
              const Text('Access Denied', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
              const SizedBox(height: 8),
              Text('Only administrators can access this page', style: TextStyle(color: AppTheme.textSecondary.withOpacity(0.7))),
              const SizedBox(height: 24),
              ElevatedButton(onPressed: () => Navigator.pop(context), child: const Text('Go Back')),
            ]),
          ),
        ),
      );
    }

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(gradient: AppTheme.backgroundGradient),
        child: SafeArea(
          child: Column(children: [
            _buildHeader(),
            _buildStats(),
            _buildSearchBar(),
            _buildFilterChips(),
            Expanded(child: _buildEmployeesList()),
          ]),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _showAddEmployeeDialog,
        backgroundColor: AppTheme.primaryColor,
        icon: const Icon(Icons.person_add),
        label: const Text('Add Employee'),
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
          child: const Icon(Icons.people_alt_rounded, color: Colors.white, size: 24),
        ),
        const SizedBox(width: 12),
        const Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('Manage Employees', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
            Text('Admin Panel', style: TextStyle(fontSize: 13, color: AppTheme.textSecondary)),
          ]),
        ),
        IconButton(
          onPressed: _loadEmployees,
          style: IconButton.styleFrom(backgroundColor: AppTheme.surfaceColor, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
          icon: const Icon(Icons.refresh, color: AppTheme.primaryColor),
        ),
      ]),
    );
  }

  Widget _buildStats() {
    return Consumer<EmployeeProvider>(
      builder: (context, provider, _) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(children: [
            _buildStatCard('Total', provider.totalEmployees.toString(), Icons.people, AppTheme.primaryColor),
            const SizedBox(width: 12),
            _buildStatCard('Active', provider.activeEmployees.toString(), Icons.check_circle, AppTheme.success),
            const SizedBox(width: 12),
            _buildStatCard('Inactive', provider.inactiveEmployees.toString(), Icons.cancel, AppTheme.error),
          ]),
        );
      },
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(color: AppTheme.backgroundCard, borderRadius: BorderRadius.circular(14)),
        child: Row(children: [
          Container(
            width: 36, height: 36,
            decoration: BoxDecoration(color: color.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
            child: Icon(icon, color: color, size: 18),
          ),
          const SizedBox(width: 10),
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
            Text(label, style: TextStyle(fontSize: 11, color: AppTheme.textSecondary.withOpacity(0.7))),
          ]),
        ]),
      ),
    );
  }

  Widget _buildSearchBar() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Container(
        decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(14)),
        child: TextField(
          controller: _searchController,
          style: const TextStyle(color: AppTheme.textPrimary),
          decoration: InputDecoration(
            hintText: 'Search employees...',
            hintStyle: TextStyle(color: AppTheme.textMuted.withOpacity(0.5)),
            prefixIcon: const Icon(Icons.search, color: AppTheme.textMuted),
            border: InputBorder.none,
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          ),
          onChanged: (_) => setState(() {}),
        ),
      ),
    );
  }

  Widget _buildFilterChips() {
    final filters = [
      {'id': 'all', 'label': 'All'},
      {'id': 'active', 'label': 'Active'},
      {'id': 'inactive', 'label': 'Inactive'},
    ];

    return Container(
      height: 44, margin: const EdgeInsets.only(bottom: 16),
      child: ListView.separated(
        scrollDirection: Axis.horizontal, padding: const EdgeInsets.symmetric(horizontal: 20),
        itemCount: filters.length, separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final filter = filters[index];
          final isSelected = _selectedFilter == filter['id'];
          return GestureDetector(
            onTap: () => setState(() => _selectedFilter = filter['id']!),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              decoration: BoxDecoration(
                color: isSelected ? AppTheme.primaryColor : AppTheme.surfaceColor,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(child: Text(filter['label']!, style: TextStyle(color: isSelected ? Colors.white : AppTheme.textSecondary, fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal))),
            ),
          );
        },
      ),
    );
  }

  Widget _buildEmployeesList() {
    return Consumer<EmployeeProvider>(
      builder: (context, provider, _) {
        if (provider.isLoading) {
          return const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor));
        }

        if (provider.error != null) {
          return Center(
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Icon(Icons.error_outline, size: 64, color: AppTheme.error.withOpacity(0.5)),
              const SizedBox(height: 16),
              Text('Error: ${provider.error}', textAlign: TextAlign.center, style: const TextStyle(color: AppTheme.textSecondary)),
              const SizedBox(height: 16),
              TextButton(onPressed: _loadEmployees, child: const Text('Retry')),
            ]),
          );
        }

        // Apply search and filter
        List<User> employees = _searchController.text.isNotEmpty
            ? provider.search(_searchController.text)
            : provider.employees;

        if (_selectedFilter == 'active') {
          employees = employees.where((e) => e.isActive).toList();
        } else if (_selectedFilter == 'inactive') {
          employees = employees.where((e) => !e.isActive).toList();
        }

        if (employees.isEmpty) {
          return Center(
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Icon(Icons.people_outline, size: 64, color: AppTheme.textMuted.withOpacity(0.3)),
              const SizedBox(height: 16),
              const Text('No employees found', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AppTheme.textPrimary)),
              const SizedBox(height: 8),
              Text('Add employees using the button below', style: TextStyle(fontSize: 14, color: AppTheme.textSecondary.withOpacity(0.7))),
            ]),
          );
        }

        return RefreshIndicator(
          onRefresh: () async => _loadEmployees(),
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            itemCount: employees.length,
            itemBuilder: (context, index) => _buildEmployeeCard(employees[index]),
          ),
        );
      },
    );
  }

  Widget _buildEmployeeCard(User employee) {
    return GestureDetector(
      onTap: () => _showEmployeeDetails(employee),
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppTheme.backgroundCard,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: employee.isActive ? AppTheme.surfaceLight.withOpacity(0.3) : AppTheme.error.withOpacity(0.3)),
        ),
        child: Row(children: [
          // Avatar
          Container(
            width: 52, height: 52,
            decoration: BoxDecoration(
              gradient: employee.isActive ? AppTheme.primaryGradient : null,
              color: employee.isActive ? null : AppTheme.surfaceLight,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Center(
              child: Text(employee.initials, style: TextStyle(color: employee.isActive ? Colors.white : AppTheme.textMuted, fontWeight: FontWeight.bold, fontSize: 18)),
            ),
          ),
          const SizedBox(width: 14),
          // Details
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Expanded(child: Text(employee.name, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppTheme.textPrimary))),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: employee.isActive ? AppTheme.success.withOpacity(0.15) : AppTheme.error.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(employee.isActive ? 'Active' : 'Inactive', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: employee.isActive ? AppTheme.success : AppTheme.error)),
                ),
              ]),
              const SizedBox(height: 4),
              Text(employee.email, style: TextStyle(fontSize: 13, color: AppTheme.textSecondary.withOpacity(0.7))),
              const SizedBox(height: 6),
              Row(children: [
                if (employee.employeeId != null) ...[
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(6)),
                    child: Text(employee.employeeId!, style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                  ),
                  const SizedBox(width: 8),
                ],
                if (employee.department != null)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(color: AppTheme.primaryColor.withOpacity(0.1), borderRadius: BorderRadius.circular(6)),
                    child: Text(employee.department!, style: const TextStyle(fontSize: 11, color: AppTheme.primaryColor)),
                  ),
              ]),
            ]),
          ),
          const Icon(Icons.chevron_right, color: AppTheme.textMuted),
        ]),
      ),
    );
  }

  void _showEmployeeDetails(User employee) {
    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.6, minChildSize: 0.4, maxChildSize: 0.9,
        expand: false,
        builder: (context, scrollController) => SingleChildScrollView(
          controller: scrollController,
          padding: const EdgeInsets.all(24),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
            const SizedBox(height: 24),
            // Header
            Center(
              child: Column(children: [
                Container(
                  width: 80, height: 80,
                  decoration: BoxDecoration(gradient: AppTheme.primaryGradient, borderRadius: BorderRadius.circular(20)),
                  child: Center(child: Text(employee.initials, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 28))),
                ),
                const SizedBox(height: 16),
                Text(employee.name, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
                const SizedBox(height: 4),
                Text(employee.email, style: const TextStyle(fontSize: 14, color: AppTheme.textSecondary)),
              ]),
            ),
            const SizedBox(height: 24),
            // Info Cards
            _buildInfoRow(Icons.badge, 'Employee ID', employee.employeeId ?? 'N/A'),
            _buildInfoRow(Icons.business, 'Department', employee.department ?? 'Not assigned'),
            _buildInfoRow(Icons.work, 'Position', employee.position ?? 'Not assigned'),
            _buildInfoRow(Icons.shield, 'Role', employee.role.toUpperCase()),
            _buildInfoRow(Icons.circle, 'Status', employee.isActive ? 'Active' : 'Inactive'),
            const SizedBox(height: 24),
            // Actions
            Row(children: [
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () {
                    Navigator.pop(context);
                    _showEditEmployeeDialog(employee);
                  },
                  icon: const Icon(Icons.edit), label: const Text('Edit'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () async {
                    Navigator.pop(context);
                    await context.read<EmployeeProvider>().toggleActive(employee.id);
                  },
                  icon: Icon(employee.isActive ? Icons.pause : Icons.play_arrow),
                  label: Text(employee.isActive ? 'Deactivate' : 'Activate'),
                ),
              ),
            ]),
            const SizedBox(height: 12),
            Row(children: [
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () {
                    Navigator.pop(context);
                    _showResetPasswordDialog(employee);
                  },
                  icon: const Icon(Icons.lock_reset), label: const Text('Reset Password'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () => _confirmDelete(employee),
                  style: ElevatedButton.styleFrom(backgroundColor: AppTheme.error),
                  icon: const Icon(Icons.delete), label: const Text('Delete'),
                ),
              ),
            ]),
          ]),
        ),
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(children: [
        Container(
          width: 40, height: 40,
          decoration: BoxDecoration(color: AppTheme.surfaceColor, borderRadius: BorderRadius.circular(10)),
          child: Icon(icon, color: AppTheme.primaryColor, size: 20),
        ),
        const SizedBox(width: 14),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(label, style: TextStyle(fontSize: 12, color: AppTheme.textMuted.withOpacity(0.7))),
            Text(value, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: AppTheme.textPrimary)),
          ]),
        ),
      ]),
    );
  }

  void _showAddEmployeeDialog() {
    final formKey = GlobalKey<FormState>();
    final idController = TextEditingController();
    final nameController = TextEditingController();
    final emailController = TextEditingController();
    final passwordController = TextEditingController();
    final deptController = TextEditingController();
    final posController = TextEditingController();

    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => Padding(
        padding: EdgeInsets.only(left: 24, right: 24, top: 24, bottom: MediaQuery.of(context).viewInsets.bottom + 24),
        child: Form(
          key: formKey,
          child: SingleChildScrollView(
            child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
              Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
              const SizedBox(height: 24),
              const Text('Add New Employee', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
              const SizedBox(height: 24),
              _buildTextField(idController, 'Employee ID', Icons.badge, required: true),
              const SizedBox(height: 12),
              _buildTextField(nameController, 'Full Name', Icons.person, required: true),
              const SizedBox(height: 12),
              _buildTextField(emailController, 'Email', Icons.email, required: true, keyboardType: TextInputType.emailAddress),
              const SizedBox(height: 12),
              _buildTextField(passwordController, 'Password', Icons.lock, required: true, obscure: true),
              const SizedBox(height: 12),
              _buildTextField(deptController, 'Department', Icons.business),
              const SizedBox(height: 12),
              _buildTextField(posController, 'Position', Icons.work),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity, height: 52,
                child: ElevatedButton(
                  onPressed: () async {
                    if (formKey.currentState!.validate()) {
                      Navigator.pop(context);
                      final success = await context.read<EmployeeProvider>().createEmployee(
                        employeeId: idController.text.trim(),
                        name: nameController.text.trim(),
                        email: emailController.text.trim(),
                        password: passwordController.text,
                        department: deptController.text.trim().isNotEmpty ? deptController.text.trim() : null,
                        position: posController.text.trim().isNotEmpty ? posController.text.trim() : null,
                      );
                      if (success && mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Employee created successfully!'), backgroundColor: AppTheme.success));
                      }
                    }
                  },
                  child: const Text('Create Employee', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                ),
              ),
            ]),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(TextEditingController controller, String label, IconData icon, {bool required = false, bool obscure = false, TextInputType? keyboardType}) {
    return TextFormField(
      controller: controller,
      obscureText: obscure,
      keyboardType: keyboardType,
      style: const TextStyle(color: AppTheme.textPrimary),
      decoration: InputDecoration(
        labelText: label, prefixIcon: Icon(icon, size: 20),
        filled: true, fillColor: AppTheme.surfaceColor,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
      ),
      validator: required ? (val) => val == null || val.isEmpty ? 'Required' : null : null,
    );
  }

  void _showEditEmployeeDialog(User employee) {
    final nameController = TextEditingController(text: employee.name);
    final emailController = TextEditingController(text: employee.email);
    final deptController = TextEditingController(text: employee.department ?? '');
    final posController = TextEditingController(text: employee.position ?? '');

    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => Padding(
        padding: EdgeInsets.only(left: 24, right: 24, top: 24, bottom: MediaQuery.of(context).viewInsets.bottom + 24),
        child: SingleChildScrollView(
          child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
            const SizedBox(height: 24),
            const Text('Edit Employee', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
            const SizedBox(height: 24),
            _buildTextField(nameController, 'Full Name', Icons.person, required: true),
            const SizedBox(height: 12),
            _buildTextField(emailController, 'Email', Icons.email, required: true),
            const SizedBox(height: 12),
            _buildTextField(deptController, 'Department', Icons.business),
            const SizedBox(height: 12),
            _buildTextField(posController, 'Position', Icons.work),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity, height: 52,
              child: ElevatedButton(
                onPressed: () async {
                  Navigator.pop(context);
                  final success = await context.read<EmployeeProvider>().updateEmployee(
                    employee.id,
                    name: nameController.text.trim(),
                    email: emailController.text.trim(),
                    department: deptController.text.trim().isNotEmpty ? deptController.text.trim() : null,
                    position: posController.text.trim().isNotEmpty ? posController.text.trim() : null,
                  );
                  if (success && mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Employee updated!'), backgroundColor: AppTheme.success));
                  }
                },
                child: const Text('Save Changes', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
              ),
            ),
          ]),
        ),
      ),
    );
  }

  void _showResetPasswordDialog(User employee) {
    final passwordController = TextEditingController();

    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: AppTheme.backgroundCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) => Padding(
        padding: EdgeInsets.only(left: 24, right: 24, top: 24, bottom: MediaQuery.of(context).viewInsets.bottom + 24),
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(2)))),
          const SizedBox(height: 24),
          Text('Reset Password for ${employee.name}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
          const SizedBox(height: 24),
          _buildTextField(passwordController, 'New Password', Icons.lock, required: true, obscure: true),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity, height: 52,
            child: ElevatedButton(
              onPressed: () async {
                if (passwordController.text.length >= 6) {
                  Navigator.pop(context);
                  final success = await context.read<EmployeeProvider>().resetPassword(employee.id, passwordController.text);
                  if (success && mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Password reset successfully!'), backgroundColor: AppTheme.success));
                  }
                }
              },
              child: const Text('Reset Password', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            ),
          ),
        ]),
      ),
    );
  }

  void _confirmDelete(User employee) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.backgroundCard,
        title: const Text('Delete Employee?', style: TextStyle(color: AppTheme.textPrimary)),
        content: Text('Are you sure you want to delete ${employee.name}? This action cannot be undone.', style: const TextStyle(color: AppTheme.textSecondary)),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context); // Close dialog
              Navigator.pop(context); // Close bottom sheet
              final success = await context.read<EmployeeProvider>().deleteEmployee(employee.id);
              if (success && mounted) {
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Employee deleted'), backgroundColor: AppTheme.error));
              }
            },
            style: ElevatedButton.styleFrom(backgroundColor: AppTheme.error),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }
}
