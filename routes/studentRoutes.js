import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { name, email, course } = req.body;
  db.query(
    "INSERT INTO students (name, email, course) VALUES (?, ?, ?)",
    [name, email, course],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, name, email, course });
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;
  db.query(
    "UPDATE students SET name=?, email=?, course=? WHERE id=?",
    [name, email, course, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Student updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Student deleted" });
  });
});

export default router;
