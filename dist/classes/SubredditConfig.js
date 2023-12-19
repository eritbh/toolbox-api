"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubredditConfig = void 0;
const config_1 = require("../helpers/config");
/**
 * A class that interfaces with the raw contents of a subreddit's `toolbox`
 * wiki page, automatically handling schema checks and providing methods to read
 * and modify subreddit configuration.
 */
class SubredditConfig {
    constructor(jsonString) {
        this.data = (0, config_1.migrateConfigToLatestSchema)(JSON.parse(jsonString));
    }
    /** Returns all usernote types. */
    getAllNoteTypes() {
        // If the config doesn't specify any note types, make a copy of the
        // default set and add them to the config so the unambiguous form will
        // be written back
        if (!this.data.usernoteColors || !this.data.usernoteColors.length) {
            const defaultTypes = config_1.DEFAULT_USERNOTE_TYPES.map(noteType => (Object.assign({}, noteType)));
            this.data.usernoteColors = defaultTypes;
        }
        return this.data.usernoteColors;
    }
    /**
     * Returns the usernote type matching the given key. Useful for looking up
     * display information for a usernote from {@linkcode Usernote.noteType}.
     *
     * @example Get the color and text of a note type from the key:
     * ```ts
     * const toolbox = new ToolboxClient(reddit);
     * const subreddit = 'mildlyinteresting';
     *
     * // Acquire a note somehow
     * const usernotes = toolbox.getUsernotes(subreddit);
     * const note = usernotes.get('eritbh')[0];
     *
     * // Look up information about the type of this note
     * const subConfig = toolbox.getConfig(subreddit);
     * const {color, text} = subConfig.getNoteType(note.noteType);
     * ```
     */
    getNoteType(key) {
        const noteTypes = this.getAllNoteTypes();
        return noteTypes.find(noteType => noteType.key === key);
    }
    /**
     * Serializes the subreddit config data for writing back to the wiki. **This
     * method returns an object; you probably want {@linkcode toString}
     * instead.**
     * @returns Object which can be serialized to JSON and written as the
     * contents of the `toolbox` wiki page
     */
    toJSON() {
        return this.data;
    }
    /**
     * Stringifies the subreddit config data for writing back to the wiki.
     * @param indent Passed as the third argument of `JSON.stringify`. Useful
     * for debugging; however, because wiki space is limited, never provide this
     * parameter when actually saving config to the wiki.
     * @returns JSON string which can be saved as the contents of the `toolbox`
     * wiki page
     */
    toString(indent) {
        return JSON.stringify(this.data, null, indent);
    }
}
exports.SubredditConfig = SubredditConfig;
