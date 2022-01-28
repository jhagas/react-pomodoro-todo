import { Settings } from "./settingContext";
import Todo from "./Todo";

function App() {
  return (
    <div className="h-screen flex flex-col items-center bg-gray6 overflow-y-auto">
      <div className="max-w-2xl min-w-[36rem]">
        <div className="mt-4 mb-5 flex flex-col items-center justify-center">
          <Settings />
        </div>
        <Todo />
      </div>
    </div>
  );
}

export default App;
