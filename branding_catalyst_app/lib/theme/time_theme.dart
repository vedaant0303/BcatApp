import 'package:flutter/material.dart';

/// Time-based theme configuration for dynamic UI
class TimeTheme {
  final String greeting;
  final String emoji;
  final LinearGradient gradient;
  final LinearGradient cardGradient;
  final Color primaryColor;
  final IconData icon;
  final String subtitle;

  const TimeTheme({
    required this.greeting,
    required this.emoji,
    required this.gradient,
    required this.cardGradient,
    required this.primaryColor,
    required this.icon,
    required this.subtitle,
  });

  /// Get theme based on current hour
  static TimeTheme get current {
    final hour = DateTime.now().hour;

    // Night: 9pm - 5am (21:00 - 05:00)
    if (hour >= 21 || hour < 5) {
      return const TimeTheme(
        greeting: 'Good Night',
        emoji: '🌙',
        gradient: LinearGradient(
          colors: [Color(0xFF1a1a2e), Color(0xFF16213e), Color(0xFF0f3460)],
          begin: Alignment.topLeft, end: Alignment.bottomRight,
        ),
        cardGradient: LinearGradient(
          colors: [Color(0xFF4a148c), Color(0xFF7b1fa2)],
          begin: Alignment.topLeft, end: Alignment.bottomRight,
        ),
        primaryColor: Color(0xFF9c27b0),
        icon: Icons.bedtime_rounded,
        subtitle: 'Time to rest and recharge',
      );
    }
    
    // Early Morning: 5am - 8am (05:00 - 08:00)
    if (hour >= 5 && hour < 8) {
      return const TimeTheme(
        greeting: 'Good Morning',
        emoji: '🌅',
        gradient: LinearGradient(
          colors: [Color(0xFF1a2a4a), Color(0xFF2d4a6a), Color(0xFF4a6a8a)],
          begin: Alignment.topLeft, end: Alignment.bottomRight,
        ),
        cardGradient: LinearGradient(
          colors: [Color(0xFFff6f00), Color(0xFFff9800)],
          begin: Alignment.topLeft, end: Alignment.bottomRight,
        ),
        primaryColor: Color(0xFFff9800),
        icon: Icons.wb_twilight_rounded,
        subtitle: 'Start your day fresh!',
      );
    }
    
    // Morning: 8am - 12pm (08:00 - 12:00)
    if (hour >= 8 && hour < 12) {
      return const TimeTheme(
        greeting: 'Good Morning',
        emoji: '☀️',
        gradient: LinearGradient(
          colors: [Color(0xFF1a1a2e), Color(0xFF2d2d4a), Color(0xFF3d3d5a)],
          begin: Alignment.topLeft, end: Alignment.bottomRight,
        ),
        cardGradient: LinearGradient(
          colors: [Color(0xFF4caf50), Color(0xFF66bb6a)],
          begin: Alignment.topLeft, end: Alignment.bottomRight,
        ),
        primaryColor: Color(0xFF4caf50),
        icon: Icons.wb_sunny_rounded,
        subtitle: 'Have a productive morning!',
      );
    }
    
    // Afternoon: 12pm - 5pm (12:00 - 17:00)
    if (hour >= 12 && hour < 17) {
      return const TimeTheme(
        greeting: 'Good Afternoon',
        emoji: '🌤️',
        gradient: LinearGradient(
          colors: [Color(0xFF1a1a2e), Color(0xFF252540), Color(0xFF303055)],
          begin: Alignment.topLeft, end: Alignment.bottomRight,
        ),
        cardGradient: LinearGradient(
          colors: [Color(0xFF2196f3), Color(0xFF42a5f5)],
          begin: Alignment.topLeft, end: Alignment.bottomRight,
        ),
        primaryColor: Color(0xFF2196f3),
        icon: Icons.cloud_rounded,
        subtitle: 'Keep up the great work!',
      );
    }
    
    // Evening: 5pm - 9pm (17:00 - 21:00)
    return const TimeTheme(
      greeting: 'Good Evening',
      emoji: '🌇',
      gradient: LinearGradient(
        colors: [Color(0xFF1a1a2e), Color(0xFF2a1a3e), Color(0xFF3a2a4e)],
        begin: Alignment.topLeft, end: Alignment.bottomRight,
      ),
      cardGradient: LinearGradient(
        colors: [Color(0xFFe65100), Color(0xFFff6d00)],
        begin: Alignment.topLeft, end: Alignment.bottomRight,
      ),
      primaryColor: Color(0xFFff6d00),
      icon: Icons.nights_stay_rounded,
      subtitle: 'Wrapping up the day!',
    );
  }
}
