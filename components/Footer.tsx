export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-400 text-sm mb-4">
          &copy; {new Date().getFullYear()} Pulzo. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs max-w-3xl mx-auto leading-relaxed">
          This tool is meant for learning and informational purposes only. It is not financial advice. Previous results do not ensure future outcomes. Pack results are random. Proceed at your own risk.
        </p>
      </div>
    </footer>
  );
}
