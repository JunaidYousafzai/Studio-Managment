import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getBoards, createBoard } from "../api/board";
import { getBoardColumns, createColumn ,updateColumn,deleteColumn} from "../api/column";
import ColumnCard from "../components/ColumnCard";
import BoardSidebar from "../components/BoardSidebar";

const Board = () => {
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const fetchBoardsAndColumns = async () => {
    const res = await getBoards();
    const boards = res.data || [];

    const board = boards.find((b) => b.id === selectedBoardId);
    setSelectedBoard(board || null);

    if (!board) return;

    setLoading(true);
    const colRes = await getBoardColumns(board.id);
    setColumns(colRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedBoardId) {
      fetchBoardsAndColumns();
    }
  }, [selectedBoardId]);

  const handleAddColumn = async () => {
    const name = prompt("Enter column name");
    if (!name) return;
    await createColumn(selectedBoardId, { name });
    fetchBoardsAndColumns();
  };

  const handleCreateBoard = async () => {
    const name = prompt("Enter board name");
    if (!name) return;
    const res = await createBoard({ name });
    setSelectedBoardId(res.data.id);
  };

  const handleJoinBoard = () => {
    navigate('/join-board'); 
  };

  const handleColumnUpdated = async (columnId, updatedData) => {
    try {
      await updateColumn(columnId, updatedData);
      fetchBoardsAndColumns(); 
    } catch (error) {
      console.error("Error updating column:", error);
      alert("Failed to update column");
    }
  };

  const handleColumnDeleted = async (columnId) => {
    if (!window.confirm("Are you sure you want to delete this column?")) return;
    
    try {
      await deleteColumn(columnId);
      fetchBoardsAndColumns(); 
    } catch (error) {
      console.error("Error deleting column:", error);
      alert("Failed to delete column");
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <BoardSidebar
        selectedBoardId={selectedBoardId}
        setSelectedBoardId={setSelectedBoardId}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 p-4 overflow-x-auto">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed bottom-4 right-4 bg-blue-600/80 text-white p-3 rounded-full z-20 shadow-lg hover:bg-blue-700/80 transition-colors"
        >
          ☰
        </button>

        {!selectedBoardId ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center max-w-md p-8 rounded-xl bg-gray-800/50 border border-gray-700 shadow-lg">
              <div className="mb-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-700 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to Your Boards</h2>
                <p className="text-gray-400">
                  Get started by creating a new board or joining an existing one
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4  justify-center">
                <button
                  onClick={handleCreateBoard}
                  className="bg-white  cursor-pointer hover:-translate-y-0.5 text-black duration-200 inline-block text-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]  px-6 py-3 rounded-lg font-medium transition-colorspx-6  transition-colors"
                >
                  Create New Board
                </button>
                <button
                  onClick={handleJoinBoard}
                  className="bg-white  cursor-pointer hover:-translate-y-0.5 text-black duration-200 inline-block text-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]  px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Join Existing Board
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {selectedBoard?.role === "admin" && (
              <div className="mb-4 bg-gray-800 p-4 rounded shadow">
                <p className="text-sm text-gray-300">Invite Code:</p>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-700 px-2 py-1 rounded text-green-400">{selectedBoard.invite_code}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(selectedBoard.invite_code)}
                    className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedBoard?.name || "Board Columns"}</h2>
              <button
                onClick={handleAddColumn}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
              >
                + Add Column
              </button>
            </div>

            <div className="flex space-x-4 overflow-x-auto pb-4">
              {loading ? (
                <p>Loading columns...</p>
              ) : columns.length === 0 ? (
                <p>No columns yet. Add one to get started.</p>
              ) : (
                columns.map((col) => (
                  <ColumnCard
                    key={col.id}
                    column={col}
                    onTaskCreated={(newTask) => handleTaskCreated(col.id, newTask)}
                    onColumnUpdated={handleColumnUpdated}
                    onColumnDeleted={handleColumnDeleted}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Board;