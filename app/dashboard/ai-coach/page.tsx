import { verifySession } from '@/app/lib/dal';
import AiCoachChat from '@/components/AiCoachChat';

export default async function AiCoachPage() {
  const { user } = await verifySession();
  const firstName = user.full_name?.split(' ')[0] || 'there';

  return (
    <div style={{ height: '100vh' }}>
      <AiCoachChat firstName={firstName} />
    </div>
  );
}
