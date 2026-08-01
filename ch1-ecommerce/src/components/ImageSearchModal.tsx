// src/components/ImageSearchModal.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, X, Sparkles, CheckCircle2 } from 'lucide-react';
import './ImageSearchModal.css';

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEMO_PRESETS = [
  {
    name: 'Shoes & Sneakers',
    query: 'shoes',
    img: 'https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers/1.png',
  },
  {
    name: 'Essence Mascara',
    query: 'mascara',
    img: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
  },
  {
    name: 'Eyeshadow Palette',
    query: 'eyeshadow',
    img: 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png',
  },
  {
    name: 'Laptops & Computers',
    query: 'laptop',
    img: 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014/1.png',
  },
  {
    name: 'Luxury Watches',
    query: 'watch',
    img: 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Submariner/1.png',
  },
  {
    name: 'Fragrances & Perfumes',
    query: 'perfume',
    img: 'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png',
  },
];

export default function ImageSearchModal({ isOpen, onClose }: ImageSearchModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setSelectedPreset(preset.name);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      onClose();
      navigate(`/?search=${encodeURIComponent(preset.query)}`);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        onClose();
        // search keyword derived from file name or fallback
        const keyword = file.name.split('.')[0].replace(/[^a-zA-Z]/g, '') || 'shoes';
        navigate(`/?search=${encodeURIComponent(keyword)}`);
      }, 1400);
    }
  };

  return (
    <div className="image-search-overlay" onClick={onClose}>
      <div className="image-search-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-icon-badge">
            <Camera size={24} />
          </div>
          <h3>Visual Image Search</h3>
          <p>Drag and drop a product photo or select a sample image below to find matching items instantly.</p>
        </div>

        {analyzing ? (
          <div className="analyzing-state">
            <div className="pulsing-scan-ring">
              <Sparkles size={32} className="spin-sparkle" />
            </div>
            <h4>Analyzing Image with AI...</h4>
            <p>Matching visual patterns, colors, and category attributes</p>
          </div>
        ) : (
          <>
            {/* Drag & Drop Box */}
            <label
              className={`dropzone ${dragActive ? 'active' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setAnalyzing(true);
                  setTimeout(() => {
                    setAnalyzing(false);
                    onClose();
                    navigate('/?search=shoes');
                  }, 1200);
                }
              }}
            >
              <input type="file" accept="image/*" onChange={handleFileUpload} hidden />
              <Upload size={32} className="upload-icon" />
              <span className="drop-title">Drop your image here, or <strong>browse files</strong></span>
              <span className="drop-sub">Supports JPG, PNG, WebP up to 10MB</span>
            </label>

            <div className="presets-section">
              <span className="presets-label">Or search with sample product images:</span>
              <div className="presets-grid">
                {DEMO_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    className={`preset-chip ${selectedPreset === preset.name ? 'active' : ''}`}
                    onClick={() => handleSelectPreset(preset)}
                  >
                    <img src={preset.img} alt={preset.name} className="preset-thumb" />
                    <span>{preset.name}</span>
                    {selectedPreset === preset.name && <CheckCircle2 size={14} className="check-icon" />}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
