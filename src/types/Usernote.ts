/** Details about a newly created usernote */
export interface UsernoteInit {
	/** The name of the user this note is attached to */
	username: string;
	/** The text of the note */
	text: string;
	/** The date and time the note was left, defaulting to the current time */
	timestamp?: Date;
	/**
	 * The username of the moderator who left the note, defaulting to the
	 * app user
	 */
	moderatorUsername?: string;
	/**
	 * The `key` of the note type of this note, used to look up details about
	 * the note type from the subreddit's Toolbox config
	 */
	noteType?: string;
	/** Permalink to the item the note was left in response to */
	contextPermalink?: string;
}

/** A single usernote on a user */
export interface Usernote extends UsernoteInit {
	/** The date and time the note was left */
	timestamp: Date;
	/** The username of the moderator who left the note */
	moderatorUsername: string;
}