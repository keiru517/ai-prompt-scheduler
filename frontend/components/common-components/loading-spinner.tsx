export default function Spinner({ content }: { content: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent dark:border-purple-400 dark:border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-600 dark:text-gray-300">{content}</p>
      </div>
    </div>
  );
}
