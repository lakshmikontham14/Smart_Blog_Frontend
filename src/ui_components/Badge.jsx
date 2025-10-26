

const Badge = ({blog}) => {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/80 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
      {blog?.category}
    </span>
  );
};

export default Badge;
