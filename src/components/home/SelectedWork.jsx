import { useState } from 'react';
import { selectedWork, backdrops } from '../../data/homeContent';
import { LINKS } from '../../constants/links';
import { scrollToTarget } from '../../lib/smoothScroll';
import { ArrowRightIcon } from './icons';
import SectionBackdrop from './SectionBackdrop';
import Modal, { ConfirmToast } from '../Modal';

export default function SelectedWork() {
  const [activeItem, setActiveItem] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const closeModal = () => {
    setActiveItem(null);
    setShowToast(false);
  };

  const handleBookCall = () => {
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <section className="tvl-home-section tvl-home-section--dark" id="work">
      <SectionBackdrop variant="ink" {...backdrops.work} />
      <div className="tvl-home-inner">
        <div className="tvl-home-work-head" data-reveal>
          <div>
            <span className="tvl-home-eyebrow">{selectedWork.eyebrow}</span>
            <h2 className="tvl-home-h2">
              {selectedWork.heading.map((line, i) => (
                <span key={line} className={i === selectedWork.headingAccentIndex ? 'tvl-home-accent' : undefined}>
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <span className="tvl-home-work-divider" aria-hidden="true" />
          <p className="tvl-home-work-note">{selectedWork.note}</p>
        </div>

        <div className="tvl-home-work-grid" data-reveal-stagger>
          {selectedWork.items.map((item) => (
            <article className="tvl-home-work-card" key={item.id} data-reveal-item>
              <div className="tvl-home-work-media">
                <img src={item.poster} alt={`${item.title} — sample layout placeholder`} loading="lazy" />
              </div>
              <div className="tvl-home-work-body">
                <div className="tvl-home-work-tags">{item.tags}</div>
                <h3 className="tvl-home-h3">{item.title}</h3>
                <p className="tvl-home-body">{item.line}</p>
                <button
                  type="button"
                  className="tvl-home-btn tvl-home-btn--ghost"
                  onClick={() => setActiveItem(item)}
                >
                  View Project
                  <ArrowRightIcon />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="tvl-home-work-footer" data-reveal>
          <button
            type="button"
            className="tvl-home-btn tvl-home-btn--outline"
            onClick={() => scrollToTarget(`#${selectedWork.exploreCta.targetId}`)}
          >
            {selectedWork.exploreCta.label}
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <Modal open={Boolean(activeItem)} onClose={closeModal} ariaLabel={activeItem ? activeItem.title : 'Project details'}>
        {activeItem ? (
          <div className="tvl-home-work-modal">
            <div className="tvl-home-work-modal-media">
              <img src={activeItem.poster} alt={`${activeItem.title} — sample layout placeholder`} />
            </div>
            <div className="tvl-home-work-tags">{activeItem.tags}</div>
            <h3 className="tvl-home-h3" style={{ fontSize: '1.6rem' }}>{activeItem.title}</h3>
            <p className="tvl-home-body">{activeItem.line}</p>
            <a
              href={LINKS.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tvl-home-btn tvl-home-btn--primary"
              onClick={handleBookCall}
            >
              Book a Call
              <ArrowRightIcon />
            </a>
            <ConfirmToast show={showToast} message="Opening your booking link in a new tab." />
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
