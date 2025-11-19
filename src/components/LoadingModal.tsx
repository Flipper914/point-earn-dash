interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

export const LoadingModal = ({ isOpen, message = "Loading Ad..." }: LoadingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl p-8 mx-4 text-center space-y-4">
        <div className="w-12 h-12 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-lg font-semibold text-foreground">{message}</p>
      </div>
    </div>
  );
};
