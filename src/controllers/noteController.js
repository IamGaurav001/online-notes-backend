import Note from "../models/Note.js"

export const createNote = async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;

    const newNote = new Note({
      title,
      content,
      isPublic: isPublic ?? false, 
      user: req.userId,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPublicNotes = async (req, res) => {
    try {
        const publicNotes = await Note.find({ isPublic: true })
            .populate('user', 'username')
            .sort({ updatedAt: -1 });
        res.status(200).json(publicNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};