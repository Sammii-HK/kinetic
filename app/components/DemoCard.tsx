"use client";

export default function DemoCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-medium text-white">{title}</h2>
        <p className="text-sm text-white/50">{description}</p>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-[320px] rounded-xl bg-white/[0.02] overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
