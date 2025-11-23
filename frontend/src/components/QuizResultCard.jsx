const QuizResultCard = ({ result }) => {
  return (
    <div className="border p-4 rounded mb-3 bg-white shadow">
      <h4 className="font-semibold">
        {result.quizId.topic || "Quiz Topic"}
      </h4>

      <p className="text-sm">
        Score: {result.score} / {result.total}
      </p>

      <p className="text-sm text-gray-500">
        Taken: {new Date(result.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default QuizResultCard;
