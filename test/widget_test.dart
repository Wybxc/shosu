import 'package:flutter_test/flutter_test.dart';
import 'package:shosu/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const ShosuApp());
    expect(find.byType(ShosuApp), findsOneWidget);
  });
}
