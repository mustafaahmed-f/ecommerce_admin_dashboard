interface DetailProps {
  value: string;
  label: string;
}

function Detail({ value, label }: DetailProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-muted-foreground text-xs uppercase">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

export default Detail;
