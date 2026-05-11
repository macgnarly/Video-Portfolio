/* =============================================
   DATA
   ============================================= */
const FEATURED = [
    {
        num: '01',
        title: 'Sunflowers in the Rain (Feature Documentary Film)',
        sub: 'Feature Documentary — Ukraine',
        category: 'Documentary',
        role: 'Director / DP / Editor',
        platform: 'vimeo',
        videoId: '999058772',
        thumb: 'https://vumbnail.com/999058772.jpg',
    },
    {
        num: '02',
        title: 'Berlin Bio × AI Hackathon',
        sub: 'Event Film — Berlin',
        category: 'Commercial',
        role: 'Director / DP / Editor',
        platform: 'vimeo',
        videoId: '1191281814',
        thumb: 'https://vumbnail.com/1191281814.jpg',
    },
    {
        num: '03',
        title: 'The Birth of KYIV DANCE PUNK',
        sub: 'Full Live Concert',
        category: 'Performance',
        role: 'Director / DP / Editor',
        platform: 'youtube',
        videoId: 'guY2nhyAYyo',
        thumb: 'https://img.youtube.com/vi/guY2nhyAYyo/maxresdefault.jpg',
    },
    {
        num: '04',
        title: 'Loving Strangers Hostel',
        sub: 'Pico Island, Portugal',
        category: 'Commercial',
        role: 'Director / DP / Editor',
        platform: 'vimeo',
        videoId: '1094902535',
        thumb: 'https://vumbnail.com/1094902535.jpg',
    },
    {
        num: '05',
        title: 'SIRENS',
        sub: 'Dance Film — Vancouver, CA',
        category: 'Dance Film',
        role: 'Director / DP / Editor',
        platform: 'youtube',
        videoId: 'fYUbVP7umds',
        thumb: 'https://img.youtube.com/vi/fYUbVP7umds/maxresdefault.jpg',
    },
    {
        num: '06',
        title: 'Ewoks Talk About Love',
        sub: 'Leonardo Das Cabrio — Music Video',
        category: 'Music Video',
        role: 'Director / DP / Editor',
        platform: 'youtube',
        videoId: 'maoGNtknyyc',
        thumb: 'https://img.youtube.com/vi/maoGNtknyyc/maxresdefault.jpg',
    },
    {
        num: '07',
        title: 'Blue/Yellow USA',
        sub: 'Volunteer Video',
        category: 'Commercial',
        role: 'Director / DP / Editor',
        platform: 'youtube',
        videoId: 'jyq21wzeilo',
        thumb: 'https://img.youtube.com/vi/jyq21wzeilo/maxresdefault.jpg',
    },
    {
        num: '08',
        title: 'Girl',
        sub: 'Sara Hartman — Official Music Video',
        category: 'Music Video',
        role: 'Director / DP / Editor',
        platform: 'youtube',
        videoId: '5W3DFeDvR0g',
        thumb: 'https://img.youtube.com/vi/5W3DFeDvR0g/maxresdefault.jpg',
    },
];

const OVERFLOW = [
    {
        num: '09',
        title: 'Jenna Berlyn — Synthwave',
        sub: 'To The Chase by Giorgio Moroder',
        category: 'Dance Film',
        platform: 'youtube',
        videoId: 'v1nEOCg_8BU',
    },
];

/* =============================================
   RENDER
   ============================================= */
function renderFeatured() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = FEATURED.map((p, i) => `
        <article
            class="project-card reveal"
            style="--reveal-delay: ${(i % 2) * 0.1}s"
            data-platform="${p.platform}"
            data-video-id="${p.videoId}"
            data-title="${p.title}"
            data-cat="${p.category}"
            role="button"
            tabindex="0"
            aria-label="Play ${p.title}"
        >
            <div class="project-thumb">
                <div class="project-thumb-bg">
                    <span class="thumb-fallback-text">${p.title.toUpperCase()}</span>
                </div>
                <img
                    src="${p.thumb}"
                    alt="${p.title}"
                    loading="lazy"
                    onload="this.classList.add('loaded')"
                    onerror="this.style.display='none'"
                >
                <span class="project-num">${p.num}</span>
                <div class="project-overlay">
                    <span class="project-overlay-btn">VIEW PROJECT</span>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-sub">${p.sub}</p>
                <div class="project-tags">
                    <span class="project-cat">${p.category}</span>
                    <span class="tag-sep">/</span>
                    <span class="project-role-tag">${p.role}</span>
                </div>
            </div>
        </article>
    `).join('');

    grid.querySelectorAll('.project-card').forEach(card => {
        const open = () => openModal(
            card.dataset.platform,
            card.dataset.videoId,
            card.dataset.title,
            card.dataset.cat
        );
        card.addEventListener('click', open);
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    });
}

/* =============================================
   OVERFLOW LIST
   ============================================= */
function renderOverflow() {
    const list = document.getElementById('overflow-list');
    if (!list) return;

    list.innerHTML = OVERFLOW.map(p => `
        <div
            class="work-item reveal"
            data-platform="${p.platform}"
            data-video-id="${p.videoId}"
            data-title="${p.title}"
            data-cat="${p.category}"
            role="button"
            tabindex="0"
            aria-label="Play ${p.title}"
        >
            <span class="work-num">${p.num}</span>
            <div class="work-title-wrap">
                <div class="work-title">${p.title}</div>
                <div class="work-sub">${p.sub}</div>
            </div>
            <span class="work-cat">${p.category}</span>
        </div>
    `).join('');

    list.querySelectorAll('.work-item').forEach(item => {
        const open = () => openModal(
            item.dataset.platform,
            item.dataset.videoId,
            item.dataset.title,
            item.dataset.cat
        );
        item.addEventListener('click', open);
        item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    });
}

/* =============================================
   MODAL
   ============================================= */
const modal          = document.getElementById('modal');
const modalOverlay   = document.getElementById('modal-overlay');
const modalIframe    = document.getElementById('modal-iframe');
const modalTitle     = document.getElementById('modal-title');
const modalCat       = document.getElementById('modal-cat');
const modalExternal  = document.getElementById('modal-external');
const modalClose     = document.getElementById('modal-close');

function openModal(platform, videoId, title, cat) {
    const src = platform === 'vimeo'
        ? `https://player.vimeo.com/video/${videoId}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0&dnt=1`
        : `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

    const externalUrl = platform === 'vimeo'
        ? `https://vimeo.com/${videoId}`
        : `https://www.youtube.com/watch?v=${videoId}`;

    const platformLabel = platform === 'vimeo' ? 'VIMEO' : 'YOUTUBE';

    modalIframe.src = src;
    modalTitle.textContent       = title;
    modalCat.textContent         = cat;
    modalExternal.href           = externalUrl;
    modalExternal.textContent    = `WATCH ON ${platformLabel} ↗`;

    modal.classList.add('open');
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('open');
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { modalIframe.src = ''; }, 400);
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* =============================================
   CUSTOM CURSOR
   ============================================= */
const cursorDot  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

if (cursorDot && cursorRing) {
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursorDot.style.left = mx + 'px';
        cursorDot.style.top  = my + 'px';
    }, { passive: true });

    (function animRing() {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top  = ry + 'px';
        requestAnimationFrame(animRing);
    })();

    const hoverSel = 'a, button, .project-card, .work-item, [role="button"]';

    document.addEventListener('mouseover', e => {
        if (e.target.closest(hoverSel)) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(hoverSel)) document.body.classList.remove('cursor-hover');
    });
}

/* =============================================
   INTERSECTION OBSERVER — scroll reveal
   ============================================= */
function initReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold:  0.08,
        rootMargin: '0px 0px -48px 0px',
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* =============================================
   NAV — scroll state
   ============================================= */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 60
        ? 'rgba(255,255,255,0.04)'
        : 'rgba(255,255,255,0.08)';
}, { passive: true });

/* =============================================
   MOBILE MENU
   ============================================= */
const burger     = document.getElementById('nav-burger');
const mobileMenu = document.getElementById('mobile-menu');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        burger.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            burger.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    renderOverflow();
    setTimeout(initReveal, 80);
});
