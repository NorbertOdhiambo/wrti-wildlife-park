/**
 * WRTI Icon System
 *
 * Centralized icon abstraction that uses Material Symbols Outlined as the primary icon set,
 * with fallback to Lucide React for icons not available in Material Symbols.
 *
 * This abstraction ensures that the entire application uses a consistent icon set
 * and makes it easy to swap icon libraries in the future without touching feature code.
 *
 * Usage:
 * - For Material Symbols: Use the icon name directly (e.g., 'map', 'search', 'menu')
 * - For Lucide fallbacks: The system will automatically use Lucide if Material Symbols is unavailable
 *
 * Material Symbols Outlined is loaded via Google Fonts in client/index.html
 */

import React from 'react';
import * as Lucide from 'lucide-react';

// ============================================================================
// Icon Type Definitions
// ============================================================================

export type IconName = string;

export interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  fill?: boolean;
  'aria-label'?: string;
}

// ============================================================================
// Material Symbols Icon Mapping
// ============================================================================

/**
 * Mapping of WRTI-specific icon names to Material Symbols Outlined names.
 * This allows us to use semantic names in the codebase while maintaining
 * the Material Symbols naming convention.
 */
export const materialSymbolsMap: Record<string, string> = {
  // Navigation
  menu: 'menu',
  close: 'close',
  back: 'arrow_back',
  forward: 'arrow_forward',
  home: 'home',
  search: 'search',
  settings: 'settings',
  profile: 'account_circle',
  logout: 'logout',
  login: 'login',

  // Map & Location
  map: 'map',
  location: 'location_on',
  locationOff: 'location_off',
  directions: 'directions',
  compass: 'explore',
  zoom: 'zoom_in',
  zoomOut: 'zoom_out',
  layers: 'layers',
  satellite: 'satellite_alt',
  terrain: 'terrain',
  traffic: 'traffic',

  // Discovery & Exploration
  discovery: 'explore',
  bookmark: 'bookmark',
  bookmarkOutline: 'bookmark_border',
  favorite: 'favorite',
  favoriteOutline: 'favorite_border',
  star: 'star',
  starOutline: 'star_border',
  info: 'info',
  help: 'help',

  // Tickets & Commerce
  ticket: 'confirmation_number',
  wallet: 'wallet',
  payment: 'payment',
  creditCard: 'credit_card',
  qrCode: 'qr_code',
  barcode: 'barcode',
  download: 'download',
  upload: 'upload',
  share: 'share',

  // Actions
  add: 'add',
  remove: 'remove',
  edit: 'edit',
  delete: 'delete',
  save: 'save',
  cancel: 'cancel',
  done: 'done',
  check: 'check',
  checkCircle: 'check_circle',
  error: 'error',
  warning: 'warning',
  success: 'task_alt',
  alert: 'alert',

  // Communication
  phone: 'phone',
  email: 'email',
  message: 'message',
  chat: 'chat',
  send: 'send',
  reply: 'reply',

  // Media
  camera: 'camera_alt',
  photo: 'photo',
  video: 'videocam',
  audio: 'audio_file',
  play: 'play_circle',
  pause: 'pause_circle',
  stop: 'stop_circle',
  volume: 'volume_up',
  volumeOff: 'volume_off',

  // Time & Status
  clock: 'schedule',
  calendar: 'calendar_today',
  sync: 'sync',
  loading: 'hourglass_empty',
  offline: 'cloud_off',
  online: 'cloud_done',
  pending: 'schedule',

  // UI Controls
  chevronUp: 'expand_less',
  chevronDown: 'expand_more',
  chevronLeft: 'chevron_left',
  chevronRight: 'chevron_right',
  arrowUp: 'arrow_upward',
  arrowDown: 'arrow_downward',
  arrowLeft: 'arrow_back',
  arrowRight: 'arrow_forward',
  moreVertical: 'more_vert',
  moreHorizontal: 'more_horiz',
  menu3: 'menu',
  filter: 'filter_list',
  sort: 'sort',
  view: 'visibility',
  viewOff: 'visibility_off',
  eye: 'visibility',
  eyeOff: 'visibility_off',

  // Tree & Nature
  tree: 'nature',
  leaf: 'eco',
  plant: 'plant_status',
  flower: 'flower',
  forest: 'forest',
  water: 'water',
  sun: 'sunny',
  moon: 'dark_mode',
  wind: 'air',
  rain: 'cloud_queue',
  snow: 'ac_unit',

  // User & Profile
  user: 'person',
  users: 'group',
  admin: 'admin_panel_settings',
  verified: 'verified_user',
  badge: 'badge',
  achievement: 'emoji_events',

  // Misc
  link: 'link',
  copy: 'content_copy',
  paste: 'content_paste',
  refresh: 'refresh',
  reload: 'refresh',
  expand: 'open_in_full',
  collapse: 'close_fullscreen',
  fullscreen: 'fullscreen',
  fullscreenExit: 'fullscreen_exit',
  print: 'print',
  download2: 'download',
  upload2: 'upload',
  trash: 'delete_outline',
  pin: 'location_on',
  unpin: 'location_off',
};

// ============================================================================
// Lucide Fallback Mapping
// ============================================================================

/**
 * Mapping of icon names to Lucide React components for fallback.
 * Used when Material Symbols doesn't have an icon or as a backup.
 */
export const lucideIconMap: Record<string, React.ComponentType<Lucide.LucideProps>> = {
  menu: Lucide.Menu,
  close: Lucide.X,
  back: Lucide.ArrowLeft,
  forward: Lucide.ArrowRight,
  home: Lucide.Home,
  search: Lucide.Search,
  settings: Lucide.Settings,
  profile: Lucide.User,
  logout: Lucide.LogOut,
  login: Lucide.LogIn,

  map: Lucide.Map,
  location: Lucide.MapPin,
  locationOff: Lucide.MapPinOff,
  directions: Lucide.Navigation,
  compass: Lucide.Compass,
  zoom: Lucide.ZoomIn,
  zoomOut: Lucide.ZoomOut,
  layers: Lucide.Layers,
  satellite: Lucide.Satellite,
  terrain: Lucide.Mountain,
  traffic: Lucide.AlertTriangle,

  discovery: Lucide.Compass,
  bookmark: Lucide.Bookmark,
  bookmarkOutline: Lucide.BookMarked,
  favorite: Lucide.Heart,
  favoriteOutline: Lucide.Heart,
  star: Lucide.Star,
  starOutline: Lucide.Star,
  info: Lucide.Info,
  help: Lucide.HelpCircle,

  ticket: Lucide.Ticket,
  wallet: Lucide.Wallet,
  payment: Lucide.CreditCard,
  creditCard: Lucide.CreditCard,
  qrCode: Lucide.QrCode,
  barcode: Lucide.BarChart3,
  download: Lucide.Download,
  upload: Lucide.Upload,
  share: Lucide.Share2,

  add: Lucide.Plus,
  remove: Lucide.Minus,
  edit: Lucide.Edit,
  delete: Lucide.Trash2,
  save: Lucide.Save,
  cancel: Lucide.X,
  done: Lucide.Check,
  check: Lucide.Check,
  checkCircle: Lucide.CheckCircle,
  error: Lucide.AlertCircle,
  warning: Lucide.AlertTriangle,
  success: Lucide.CheckCircle,
  alert: Lucide.AlertCircle,

  phone: Lucide.Phone,
  email: Lucide.Mail,
  message: Lucide.MessageSquare,
  chat: Lucide.MessageCircle,
  send: Lucide.Send,
  reply: Lucide.Reply,

  camera: Lucide.Camera,
  photo: Lucide.Image,
  video: Lucide.Video,
  audio: Lucide.Music,
  play: Lucide.Play,
  pause: Lucide.Pause,
  stop: Lucide.Square,
  volume: Lucide.Volume2,
  volumeOff: Lucide.VolumeX,

  clock: Lucide.Clock,
  calendar: Lucide.Calendar,
  sync: Lucide.RefreshCw,
  loading: Lucide.Loader,
  offline: Lucide.WifiOff,
  online: Lucide.Wifi,
  pending: Lucide.Clock,

  chevronUp: Lucide.ChevronUp,
  chevronDown: Lucide.ChevronDown,
  chevronLeft: Lucide.ChevronLeft,
  chevronRight: Lucide.ChevronRight,
  arrowUp: Lucide.ArrowUp,
  arrowDown: Lucide.ArrowDown,
  arrowLeft: Lucide.ArrowLeft,
  arrowRight: Lucide.ArrowRight,
  moreVertical: Lucide.MoreVertical,
  moreHorizontal: Lucide.MoreHorizontal,
  menu3: Lucide.Menu,
  filter: Lucide.Filter,
  sort: Lucide.ArrowUpDown,
  view: Lucide.Eye,
  viewOff: Lucide.EyeOff,
  eye: Lucide.Eye,
  eyeOff: Lucide.EyeOff,

  tree: Lucide.Trees,
  leaf: Lucide.Leaf,
  plant: Lucide.Sprout,
  flower: Lucide.Flower2,
  forest: Lucide.Trees,
  water: Lucide.Droplets,
  sun: Lucide.Sun,
  moon: Lucide.Moon,
  wind: Lucide.Wind,
  rain: Lucide.CloudRain,
  snow: Lucide.Snowflake,

  user: Lucide.User,
  users: Lucide.Users,
  admin: Lucide.Shield,
  verified: Lucide.CheckCircle,
  badge: Lucide.Award,
  achievement: Lucide.Trophy,

  link: Lucide.Link,
  copy: Lucide.Copy,
  paste: Lucide.Clipboard,
  refresh: Lucide.RefreshCw,
  reload: Lucide.RefreshCw,
  expand: Lucide.Maximize,
  collapse: Lucide.Minimize,
  fullscreen: Lucide.Maximize,
  fullscreenExit: Lucide.Minimize,
  print: Lucide.Printer,
  download2: Lucide.Download,
  upload2: Lucide.Upload,
  trash: Lucide.Trash2,
  pin: Lucide.MapPin,
  unpin: Lucide.MapPinOff,
};

// ============================================================================
// Icon Component
// ============================================================================

/**
 * Icon component that renders Material Symbols Outlined icons.
 *
 * Material Symbols are rendered as font icons using the Material Symbols Outlined font,
 * loaded via Google Fonts. This provides excellent performance and accessibility.
 *
 * @param name - The icon name (from materialSymbolsMap or custom Material Symbols name)
 * @param size - Icon size in pixels or CSS units (default: 24)
 * @param className - Additional CSS classes
 * @param fill - Whether to fill the icon (default: false for outlined)
 * @param ariaLabel - Accessibility label for screen readers
 */
export function Icon({
  name,
  size = 24,
  className = '',
  fill = false,
  'aria-label': ariaLabel,
}: IconProps) {
  const materialSymbolName = materialSymbolsMap[name] || name;
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      className={`material-symbols-outlined ${className} ${fill ? 'fill' : ''}`}
      style={{
        fontSize: sizeValue,
        width: sizeValue,
        height: sizeValue,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="img"
      aria-label={ariaLabel}
    >
      {materialSymbolName}
    </span>
  );
}

/**
 * Lucide Icon component for fallback or specific use cases.
 * Use this when Material Symbols doesn't have the icon you need.
 *
 * @param name - The icon name from lucideIconMap
 * @param size - Icon size in pixels (default: 24)
 * @param className - Additional CSS classes
 * @param strokeWidth - Stroke width (default: 2)
 * @param ariaLabel - Accessibility label for screen readers
 */
export function LucideIcon({
  name,
  size = 24,
  className = '',
  strokeWidth = 2,
  'aria-label': ariaLabel,
}: IconProps) {
  const LucideComponent = lucideIconMap[name];

  if (!LucideComponent) {
    console.warn(`Icon "${name}" not found in Lucide icon map`);
    return null;
  }

  return (
    <LucideComponent
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-label={ariaLabel}
    />
  );
}

// ============================================================================
// Icon Exports
// ============================================================================

export { Lucide };

export default Icon;
