interface ProductHeaderProps {
  title: string;
}
export const ProductHeader = ({
  title
}: ProductHeaderProps) => {
  return <div className="flex items-center justify-between mb-8">
      <h1 className="text-4xl font-bold text-primary dark:text-white capitalize my-[5px]">
        {title}
      </h1>
    </div>;
};