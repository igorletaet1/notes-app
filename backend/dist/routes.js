"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const router = express_1.default.Router();
// Get all notes
router.get('/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield db_1.default.query('SELECT * FROM notes');
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Create a new note
router.post('/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    try {
        const { rows } = yield db_1.default.query('INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *', [title, content]);
        res.status(201).json(rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Update a note
router.put('/notes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    try {
        const { rows } = yield db_1.default.query('UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *', [title, content, id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Delete a note
router.delete('/notes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rowCount } = yield db_1.default.query('DELETE FROM notes WHERE id = $1', [id]);
        if (rowCount === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
