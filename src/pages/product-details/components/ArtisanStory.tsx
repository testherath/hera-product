import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { ArtisanProfile } from '../types';

interface ArtisanStoryProps {
  artisan: ArtisanProfile;
}

const ArtisanStory = ({ artisan }: ArtisanStoryProps) => {
  return (
    <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border">
      <h2 className="text-2xl font-headline font-semibold text-primary mb-6 flex items-center gap-2">
        <Icon name="User" size={24} />
        Meet Your Artisan
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-card shadow-soft">
            <Image
              src={artisan.avatar}
              alt={artisan.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-headline font-semibold text-primary mb-1">
              {artisan.name}
            </h3>
            <p className="text-sm text-muted-foreground">{artisan.specialization}</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="Award" size={16} color="var(--color-accent)" />
              <span className="text-muted-foreground">{artisan.experience}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Star" size={16} color="var(--color-accent)" />
              <span className="text-muted-foreground">Master Craftsman</span>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">{artisan.bio}</p>

          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
              <Icon name="PenTool" size={16} />
              Signature Technique
            </p>
            <p className="text-sm text-muted-foreground italic">"{artisan.signature}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanStory;