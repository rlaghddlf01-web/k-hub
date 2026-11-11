import {
  BadgeCheck, Bell, BookOpen, Calculator, Camera, Check, Clock, FileText, Gift, Globe, Headset, Heart,
  MapPin, MessageCircle, ShieldCheck, Smartphone, Star, Tag, Users, Wifi, CreditCard,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { IconKey } from '@/lib/detail-types';

const MAP: Record<IconKey, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  chat: MessageCircle,
  shield: ShieldCheck,
  map: MapPin,
  bell: Bell,
  camera: Camera,
  file: FileText,
  phone: Smartphone,
  sim: CreditCard,
  calc: Calculator,
  users: Users,
  star: Star,
  clock: Clock,
  globe: Globe,
  check: BadgeCheck,
  tag: Tag,
  book: BookOpen,
  heart: Heart,
  wifi: Wifi,
  support: Headset,
  gift: Gift,
};

export function FeatureIcon({ name, className }: { name: IconKey; className?: string }) {
  const Icon = MAP[name] ?? Check;
  return <Icon className={className} strokeWidth={1.7} />;
}
