import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ResurrectioLogo } from '@/components/brand/ResurrectioLogo';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="flex justify-center mb-4"><ResurrectioLogo size={48} color="hsl(0, 72%, 35%)" /></div>
        <h1 className="mb-2 text-4xl font-serif font-bold text-foreground">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">This page doesn't exist yet.</p>
        <Link to="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
