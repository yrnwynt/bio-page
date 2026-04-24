import { useState, useEffect, useRef } from "react";
import logoSrc from "./JPG LOGO AZUL YAYO.png";

const ICON_OPTIONS = [
  { id: "globe",     label: "Website",   svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { id: "github",    label: "GitHub",    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
  { id: "twitter",   label: "Twitter/X", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg> },
  { id: "instagram", label: "Instagram", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { id: "linkedin",  label: "LinkedIn",  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { id: "youtube",   label: "YouTube",   svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg> },
  { id: "tiktok",    label: "TikTok",    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> },
  { id: "mail",      label: "Email",     svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  { id: "phone",     label: "Phone",     svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l1-1a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
  { id: "link",      label: "Link",      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> },
  { id: "star",      label: "Featured",  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { id: "book",      label: "Blog",      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
  { id: "medium",    label: "Medium",    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l7 16 5-10 5 10 3-16"/><circle cx="2" cy="4" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="22" cy="4" r="1" fill="currentColor" stroke="none"/></svg> },
  { id: "briefcase", label: "Work",      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
];

const getIcon = (id) => ICON_OPTIONS.find(o => o.id === id)?.svg || ICON_OPTIONS[9].svg;

const DEFAULT_DATA = {
  name: "Yayo.Studios",
  handle: "@yayo.studios",
  bio: "Tu fabrica personal 3D.",
  avatarColor: "#6366f1",
  avatarLetter: "B",
  avatarImg: logoSrc,
  sections: [
    {
      id: "s1",
      title: "Social",
      links: [
        { id: "l1", label: "GitHub",    icon: "github",    url: "https://github.com/berkinyilmaz" },
        { id: "l2", label: "Instagram", icon: "instagram", url: "https://instagram.com/berkindev" },
        { id: "l3", label: "TikTok",    icon: "tiktok",    url: "https://tiktok.com/@berkindev" },
      ],
    },
    {
      id: "s2",
      title: "Work",
      links: [
        { id: "l4", label: "Portfolio", icon: "globe",   url: "https://berkindev.tech" },
        { id: "l5", label: "Medium",    icon: "medium",  url: "https://medium.com/@berkinyilmaz" },
      ],
    },
  ],
};

const ACCENT_COLORS = ["#6366f1","#8b5cf6","#ec4899","#f43f5e","#0ea5e9","#10b981","#f59e0b","#ef4444"];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function loadData() {
  try {
    const raw = localStorage.getItem("bio-page-data");
    if (raw) {
      const saved = JSON.parse(raw);
      const merged = { ...DEFAULT_DATA, ...saved };
      if (!merged.avatarImg) merged.avatarImg = DEFAULT_DATA.avatarImg;
      return merged;
    }
  } catch {}
  return DEFAULT_DATA;
}

function saveData(data) {
  localStorage.setItem("bio-page-data", JSON.stringify(data));
}

// ── Modal backdrop ──────────────────────────────────────────────────────────
function Modal({ children, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modalBackdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modalPanel" role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  );
}

// ── Edit Profile Modal ──────────────────────────────────────────────────────
function EditProfileModal({ data, onSave, onClose }) {
  const [name, setName] = useState(data.name);
  const [handle, setHandle] = useState(data.handle);
  const [bio, setBio] = useState(data.bio);
  const [avatarColor, setAvatarColor] = useState(data.avatarColor);
  const [avatarLetter, setAvatarLetter] = useState(data.avatarLetter);
  const [avatarImg, setAvatarImg] = useState(data.avatarImg || null);
  const fileRef = useRef(null);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarImg(ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    onSave({ name: name.trim() || "Your Name", handle: handle.trim(), bio: bio.trim(), avatarColor, avatarLetter: avatarLetter.trim().slice(0,1).toUpperCase() || name.trim().slice(0,1).toUpperCase() || "?", avatarImg });
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="modalTitle">Edit Profile</h2>

      <div className="modalField">
        <label className="modalLabel">Photo</label>
        <div className="avatarUploadRow">
          <div className="avatarPreview" style={{ background: avatarColor }}>
            {avatarImg
              ? <img src={avatarImg} alt="preview" className="avatarImg" />
              : <span>{avatarLetter || "?"}</span>}
          </div>
          <div className="avatarUploadBtns">
            <button className="btnSecondary" onClick={() => fileRef.current?.click()} type="button">
              Upload Photo
            </button>
            {avatarImg && (
              <button className="btnSecondary" onClick={() => setAvatarImg(null)} type="button">
                Remove
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
        </div>
      </div>

      <div className="modalField">
        <label className="modalLabel">Avatar Color</label>
        <div className="colorRow">
          {ACCENT_COLORS.map(c => (
            <button
              key={c}
              className={`colorSwatch${c === avatarColor ? " selected" : ""}`}
              style={{ background: c }}
              onClick={() => setAvatarColor(c)}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="modalField">
        <label className="modalLabel" htmlFor="ep-letter">Avatar Letter</label>
        <input id="ep-letter" className="modalInput" maxLength={1} value={avatarLetter}
          onChange={e => setAvatarLetter(e.target.value.toUpperCase())} placeholder="A" />
      </div>

      <div className="modalField">
        <label className="modalLabel" htmlFor="ep-name">Name</label>
        <input id="ep-name" className="modalInput" value={name}
          onChange={e => setName(e.target.value)} placeholder="Your Name" />
      </div>

      <div className="modalField">
        <label className="modalLabel" htmlFor="ep-handle">Handle</label>
        <input id="ep-handle" className="modalInput" value={handle}
          onChange={e => setHandle(e.target.value)} placeholder="@yourhandle" />
      </div>

      <div className="modalField">
        <label className="modalLabel" htmlFor="ep-bio">Bio</label>
        <textarea id="ep-bio" className="modalTextarea" value={bio}
          onChange={e => setBio(e.target.value)} placeholder="A short bio..." rows={3} />
      </div>

      <div className="modalActions">
        <button className="btnSecondary" onClick={onClose}>Cancel</button>
        <button className="btnPrimary" onClick={handleSave}>Save</button>
      </div>
    </Modal>
  );
}

// ── Edit Link Modal ─────────────────────────────────────────────────────────
function EditLinkModal({ link, onSave, onClose }) {
  const [label, setLabel] = useState(link?.label || "");
  const [url, setUrl] = useState(link?.url || "");
  const [icon, setIcon] = useState(link?.icon || "link");

  function handleSave() {
    if (!label.trim() || !url.trim()) return;
    let finalUrl = url.trim();
    if (!finalUrl.startsWith("http") && !finalUrl.startsWith("mailto:") && !finalUrl.startsWith("tel:")) {
      finalUrl = "https://" + finalUrl;
    }
    onSave({ label: label.trim(), url: finalUrl, icon });
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="modalTitle">{link ? "Edit Link" : "Add Link"}</h2>

      <div className="modalField">
        <label className="modalLabel">Icon</label>
        <div className="iconGrid">
          {ICON_OPTIONS.map(o => (
            <button
              key={o.id}
              className={`iconOption${o.id === icon ? " selected" : ""}`}
              onClick={() => setIcon(o.id)}
              title={o.label}
              aria-label={o.label}
            >
              {o.svg}
            </button>
          ))}
        </div>
      </div>

      <div className="modalField">
        <label className="modalLabel" htmlFor="el-label">Label</label>
        <input id="el-label" className="modalInput" value={label}
          onChange={e => setLabel(e.target.value)} placeholder="GitHub" />
      </div>

      <div className="modalField">
        <label className="modalLabel" htmlFor="el-url">URL</label>
        <input id="el-url" className="modalInput" value={url}
          onChange={e => setUrl(e.target.value)} placeholder="https://..." />
      </div>

      <div className="modalActions">
        <button className="btnSecondary" onClick={onClose}>Cancel</button>
        <button className="btnPrimary" onClick={handleSave}
          disabled={!label.trim() || !url.trim()}>
          {link ? "Save" : "Add Link"}
        </button>
      </div>
    </Modal>
  );
}

// ── Edit Section Title Modal ────────────────────────────────────────────────
function EditSectionModal({ title, onSave, onClose }) {
  const [value, setValue] = useState(title);
  return (
    <Modal onClose={onClose}>
      <h2 className="modalTitle">Edit Section</h2>
      <div className="modalField">
        <label className="modalLabel" htmlFor="es-title">Section Title</label>
        <input id="es-title" className="modalInput" value={value}
          onChange={e => setValue(e.target.value)} placeholder="Section name" />
      </div>
      <div className="modalActions">
        <button className="btnSecondary" onClick={onClose}>Cancel</button>
        <button className="btnPrimary" onClick={() => { onSave(value.trim() || title); onClose(); }}>Save</button>
      </div>
    </Modal>
  );
}

// ── Link Card ───────────────────────────────────────────────────────────────
function LinkCard({ link, editing, onEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <div className={`linkCard${editing ? " linkCardEditing" : ""}`}>
      {editing && (
        <div className="linkCardReorder">
          <button className="reorderBtn" onClick={onMoveUp} disabled={isFirst} aria-label="Move up">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
          </button>
          <button className="reorderBtn" onClick={onMoveDown} disabled={isLast} aria-label="Move down">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
      )}

      <a
        href={editing ? undefined : link.url}
        target={editing ? undefined : "_blank"}
        rel="noreferrer"
        className="linkCardInner"
        onClick={editing ? (e) => e.preventDefault() : undefined}
        aria-label={link.label}
      >
        <span className="linkIcon">{getIcon(link.icon)}</span>
        <span className="linkLabel">{link.label}</span>
        <span className="linkArrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
      </a>

      {editing && (
        <div className="linkCardActions">
          <button className="linkActionBtn" onClick={onEdit} aria-label="Edit link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button className="linkActionBtn danger" onClick={onDelete} aria-label="Delete link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
function Section({ section, editing, onUpdateSection, onDeleteSection, onMoveUp, onMoveDown, isFirst, isLast }) {
  const [editSectionOpen, setEditSectionOpen] = useState(false);
  const [editLinkModal, setEditLinkModal] = useState(null); // { link } or null for add
  const [addLinkOpen, setAddLinkOpen] = useState(false);

  function updateTitle(newTitle) {
    onUpdateSection({ ...section, title: newTitle });
  }

  function addLink(linkData) {
    onUpdateSection({ ...section, links: [...section.links, { id: uid(), ...linkData }] });
  }

  function updateLink(id, linkData) {
    onUpdateSection({ ...section, links: section.links.map(l => l.id === id ? { ...l, ...linkData } : l) });
  }

  function deleteLink(id) {
    onUpdateSection({ ...section, links: section.links.filter(l => l.id !== id) });
  }

  function moveLinkUp(idx) {
    if (idx === 0) return;
    const links = [...section.links];
    [links[idx - 1], links[idx]] = [links[idx], links[idx - 1]];
    onUpdateSection({ ...section, links });
  }

  function moveLinkDown(idx) {
    if (idx === section.links.length - 1) return;
    const links = [...section.links];
    [links[idx + 1], links[idx]] = [links[idx], links[idx + 1]];
    onUpdateSection({ ...section, links });
  }

  return (
    <div className="section">
      <div className="sectionHeader">
        <h2 className="sectionTitle">{section.title}</h2>
        {editing && (
          <div className="sectionHeaderActions">
            <button className="sectionBtn" onClick={() => setEditSectionOpen(true)} aria-label="Edit section">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button className="sectionBtn" onClick={onMoveUp} disabled={isFirst} aria-label="Move section up">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            </button>
            <button className="sectionBtn" onClick={onMoveDown} disabled={isLast} aria-label="Move section down">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <button className="sectionBtn danger" onClick={onDeleteSection} aria-label="Delete section">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            </button>
          </div>
        )}
      </div>

      <div className="linkList">
        {section.links.map((link, idx) => (
          <LinkCard
            key={link.id}
            link={link}
            editing={editing}
            onEdit={() => setEditLinkModal(link)}
            onDelete={() => deleteLink(link.id)}
            onMoveUp={() => moveLinkUp(idx)}
            onMoveDown={() => moveLinkDown(idx)}
            isFirst={idx === 0}
            isLast={idx === section.links.length - 1}
          />
        ))}
        {editing && (
          <button className="addLinkBtn" onClick={() => setAddLinkOpen(true)} aria-label="Add link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Link
          </button>
        )}
      </div>

      {editSectionOpen && (
        <EditSectionModal title={section.title} onSave={updateTitle} onClose={() => setEditSectionOpen(false)} />
      )}
      {editLinkModal && (
        <EditLinkModal link={editLinkModal}
          onSave={(d) => updateLink(editLinkModal.id, d)}
          onClose={() => setEditLinkModal(null)} />
      )}
      {addLinkOpen && (
        <EditLinkModal link={null}
          onSave={addLink}
          onClose={() => setAddLinkOpen(false)} />
      )}
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(loadData);
  const [editing, setEditing] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { saveData(data); }, [data]);

  function updateProfile(profile) {
    setData(d => ({ ...d, ...profile }));
  }

  function updateSection(updated) {
    setData(d => ({ ...d, sections: d.sections.map(s => s.id === updated.id ? updated : s) }));
  }

  function deleteSection(id) {
    setData(d => ({ ...d, sections: d.sections.filter(s => s.id !== id) }));
  }

  function addSection() {
    setData(d => ({ ...d, sections: [...d.sections, { id: uid(), title: "New Section", links: [] }] }));
  }

  function moveSectionUp(idx) {
    if (idx === 0) return;
    const sections = [...data.sections];
    [sections[idx - 1], sections[idx]] = [sections[idx], sections[idx - 1]];
    setData(d => ({ ...d, sections }));
  }

  function moveSectionDown(idx) {
    if (idx === data.sections.length - 1) return;
    const sections = [...data.sections];
    [sections[idx + 1], sections[idx]] = [sections[idx], sections[idx + 1]];
    setData(d => ({ ...d, sections }));
  }

  async function copyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  function resetToDefault() {
    setData(DEFAULT_DATA);
  }

  return (
    <div className="page">
      {/* Top bar */}
      <div className="topBar">
        <span className="topBarBrand">🪪 Bio Page</span>
        <div className="topBarActions">
          {editing && (
            <button className="topBarBtn ghost" onClick={resetToDefault} aria-label="Reset to default">
              Reset
            </button>
          )}
          <button
            className={`topBarBtn${editing ? " active" : ""}`}
            onClick={() => setEditing(e => !e)}
            aria-label={editing ? "Done editing" : "Edit page"}
          >
            {editing ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Done
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit
              </>
            )}
          </button>
        </div>
      </div>

      <div className="shell">
        {/* Profile Header */}
        <header className="profileHeader">
          <div className="avatarWrap">
            <div className="avatar" style={{ background: data.avatarColor }}>
              {data.avatarImg
                ? <img src={data.avatarImg} alt={data.name} className="avatarImg" />
                : data.avatarLetter}
            </div>
            {editing && (
              <button className="avatarEditBtn" onClick={() => setEditProfileOpen(true)} aria-label="Edit profile">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            )}
          </div>
          <h1 className="profileName">{data.name}</h1>
          {data.handle && <p className="profileHandle">{data.handle}</p>}
          {data.bio && <p className="profileBio">{data.bio}</p>}

          <button className="shareBtn" onClick={copyPageLink} aria-label="Copy page link">
            {copied ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Share
              </>
            )}
          </button>
        </header>

        {/* Sections */}
        <div className="sections">
          {data.sections.map((section, idx) => (
            <Section
              key={section.id}
              section={section}
              editing={editing}
              onUpdateSection={updateSection}
              onDeleteSection={() => deleteSection(section.id)}
              onMoveUp={() => moveSectionUp(idx)}
              onMoveDown={() => moveSectionDown(idx)}
              isFirst={idx === 0}
              isLast={idx === data.sections.length - 1}
            />
          ))}
          {editing && (
            <button className="addSectionBtn" onClick={addSection} aria-label="Add section">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Section
            </button>
          )}
        </div>

        <footer className="credit">
          <a className="creditLink" href="https://instagram.com/berkindev" target="_blank" rel="noreferrer">
            Coded by @berkindev
          </a>
        </footer>
      </div>

      {editProfileOpen && (
        <EditProfileModal data={data} onSave={updateProfile} onClose={() => setEditProfileOpen(false)} />
      )}
    </div>
  );
}
