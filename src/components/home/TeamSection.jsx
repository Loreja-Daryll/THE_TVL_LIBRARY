import { founderStory, teamMembers } from '../../data/homeRebuildData';
import useReveal from '../../hooks/useReveal';

export default function TeamSection() {
  const containerRef = useReveal();

  return (
    <section className="tvl-rb-section tvl-rb-section--ivory tvl-rb-team" id="about" ref={containerRef}>
      <div className="tvl-rb-section__inner">
        <div className="tvl-rb-team__wrap">
          <div className="tvl-rb-team__portrait tvl-reveal" />
          <div className="tvl-reveal" style={{ '--d': '0.08s' }}>
            <h2 className="tvl-rb-h2">Why I started The VA Library</h2>
            <p className="tvl-rb-body">{founderStory}</p>
            <p className="tvl-rb-team__signed">Sheena May Laguerta, Founder</p>
          </div>
        </div>

        {teamMembers.length > 0 ? (
          <div className="tvl-rb-team__grid">
            {teamMembers.map((member, i) => (
              <div className="tvl-reveal" style={{ '--d': `${0.06 * i}s` }} key={member.id}>
                <div className="tvl-rb-team__person-photo">
                  {member.photo && <img src={member.photo} alt={member.name} />}
                </div>
                <p className="tvl-rb-team__person-name">{member.name}</p>
                <p className="tvl-rb-team__person-role">{member.role}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="tvl-rb-team__empty tvl-reveal">
            Meet the rest of the team, coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
