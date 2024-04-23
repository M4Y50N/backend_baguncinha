import { AppError } from "../../errors";
import Comment from "../../models/Comment";
import { commentsUpdateSchema } from "../../schemas/comments.schema";

const updateCommentsService = async (
	id: number,
	payload: any,
	userId: number
) => {
	const commentData: any = await Comment.findOne({ where: { id } });

	if (commentData.UserId != userId) {
		throw new AppError("Você não é o proprietário desse comentário!", 403);
	}

	await Comment.update(payload, {
		where: { id },
	});

	const updatedComment = await Comment.findOne({ where: { id } });

	return commentsUpdateSchema.parse(updatedComment);
};

export default updateCommentsService;