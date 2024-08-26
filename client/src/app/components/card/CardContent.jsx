import { Button } from "@/components/ui/button";

function CardContentComponent({ mode, desc, Icon, onClick }) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:scale-105 dark:bg-gray-800">
      <span className="absolute inset-0 z-10 cursor-pointer" onClick={onClick}>
        <span className="sr-only">{mode}</span>
      </span>
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        {/* <Icon className="h-12 w-12 text-primary" /> */}
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          {mode}
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400">{desc}</p>
        <Button
          className="mt-4 bg-primary bg-main text-light hover:bg-primary/90 dark:bg-primary-500 dark:text-gray-900 dark:hover:bg-primary-400"
          variant="outline"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default CardContentComponent;
