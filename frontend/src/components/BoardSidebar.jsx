import { useEffect, useState } from "react";
import { getBoards, createBoard, deleteBoard, updateBoard } from "../api/board";
import { useNavigate } from "react-router";

const BoardSidebar = ({ selectedBoardId, setSelectedBoardId, isOpen, toggleSidebar }) => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    const res = await getBoards();
    setBoards(res?.data || []);
  };

  const handleCreateBoard = async () => {
    const name = prompt("Enter board name");
    if (!name) return;
    const res = await createBoard({ name });
    setSelectedBoardId(res.data.id);
    fetchBoards();
  };

  const handleDeleteBoard = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this board?");
    if (!confirmDelete) return;

    await deleteBoard(id);

    if (selectedBoardId === id) {
      setSelectedBoardId(null);
    }

    fetchBoards();
  };

  const handleUpdateBoard = async (id, oldName) => {
    const newName = prompt("Enter new board name", oldName);
    if (!newName || newName === oldName) return;
    try {
      await updateBoard(id, { name: newName });
      fetchBoards();
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };
  const handleJoinBoard = () => {
    navigate('/join-board');
  };


  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`fixed md:relative h-full w-64 bg-black border-r border-gray-500 backdrop-blur-xl p-4 z-30 transition-all duration-300
        ${isOpen ? 'left-0' : '-left-64 md:left-0'}`}>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white/90">Boards</h2>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>

        <button
          onClick={handleCreateBoard}
          className="bg-white mb-4  cursor-pointer hover:-translate-y-0.5 text-black duration-200 inline-block text-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]  px-6 py-3 rounded-lg font-medium transition-colorspx-6  transition-colors"
        >
          Create New Board
        </button>
        <button
          onClick={handleJoinBoard}
          className="bg-white  mb-4 cursor-pointer hover:-translate-y-0.5 text-black duration-200 inline-block text-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]  px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Join Existing Board
        </button>

        <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
          {boards.map((board) => (
            <div
              key={board.id}
              className={`flex flex-col group cursor-pointer p-3 rounded-lg mb-2 hover:bg-white/20 transition-all duration-200 ${selectedBoardId === board.id ? "bg-white/25" : ""
                }`}
            >
              <div className="flex justify-between items-center w-full">
                <span
                  className="flex-1 truncate font-medium"
                  onClick={() => {
                    setSelectedBoardId(board.id);
                    if (window.innerWidth < 768) toggleSidebar();
                  }}
                >
                  {board.name}
                </span>


                <span className={`text-xs px-2 py-1 rounded-full ml-2 ${board.role === 'admin'
                    ? 'bg-green-900/50 text-green-400'
                    : 'bg-purple-900/50 text-purple-400'
                  }`}>
                  {board.role === 'admin' ? '👑 Admin' : '✋ Member'}
                </span>
              </div>

              {board.role !== 'admin' && (
                <p className="text-xs text-gray-400 mt-1 italic">
                  Hey member! Enjoy the view 😉
                </p>
              )}
              {board.role === 'admin' && selectedBoardId === board.id && (
                <p className="text-xs text-blue-400 mt-1">
                  You're the boss here! 🚀
                </p>
              )}

              <div className="flex justify-end mt-1">
                {board.role === 'admin' ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateBoard(board.id, board.name);
                      }}
                      className="text-yellow-400 hover:text-yellow-600 ml-2 opacity-0 group-hover:opacity-100 transition"
                      title="Edit Board"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBoard(board.id);
                      }}
                      className="text-red-400 hover:text-red-600 ml-2 opacity-0 group-hover:opacity-100 transition"
                      title="Delete Board"
                    >
                      🗑️
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
                    Read-only access
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default BoardSidebar;