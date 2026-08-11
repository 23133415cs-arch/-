// الصفحة الرئيسية - إعادة توجيه إلى صفحة تسجيل الدخول
// منظومة إدارة مخازن الهيئة العامة لخدمات نقل الدم
import { redirect } from 'next/navigation';

export default function HomePage() {
  // إعادة التوجيه الفورية إلى صفحة تسجيل الدخول
  redirect('/login');
}
