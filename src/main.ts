import './style.css'

type Category = 'coffee' | 'wear' | 'objects'

type Product = {
  id: number
  name: string
  category: Category
  categoryLabel: string
  price: number
  tag?: string
}

type CartItem = Product & { quantity: number }

const products: Product[] = [
  { id: 1, name: 'After Hours Blend', category: 'coffee', categoryLabel: 'Coffee · 250g', price: 21000, tag: 'Best seller' },
  { id: 2, name: 'Forest Diner Mug', category: 'objects', categoryLabel: 'Stoneware · 340ml', price: 28000, tag: 'New' },
  { id: 3, name: 'Sunday Cap', category: 'wear', categoryLabel: 'Washed cotton', price: 39000 },
  { id: 4, name: 'H11 Everyday Tee', category: 'wear', categoryLabel: 'Heavy cotton', price: 52000 },
  { id: 5, name: 'Steel Coffee Scoop', category: 'objects', categoryLabel: 'Stainless steel', price: 18000 },
  { id: 6, name: 'Night Shift Set', category: 'coffee', categoryLabel: 'Coffee + mug', price: 44000, tag: 'H11 pick' },
]

const won = new Intl.NumberFormat('ko-KR')
let activeFilter: 'all' | Category = 'all'
let cart: CartItem[] = []

const icon = (name: 'bag' | 'menu' | 'close' | 'arrow') => {
  const paths = {
    bag: '<path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
    menu: '<path d="M3 7h18M3 17h18"/>',
    close: '<path d="m5 5 14 14M19 5 5 19"/>',
    arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
  }
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="site-header" id="site-header">
    <div class="header-brand">
      <a class="wordmark" href="#top" aria-label="wanseo home">wanseo</a>
      <nav class="desktop-nav" aria-label="Main navigation">
        <a href="#shop">Shop</a>
        <a href="#about">About</a>
      </nav>
    </div>
    <div class="header-actions">
      <button class="text-button search-trigger" type="button">Search</button>
      <button class="text-button login-trigger" type="button">Login</button>
      <button class="bag-button" type="button" aria-label="Open shopping bag">
        ${icon('bag')}<span>Bag</span><b class="cart-count">0</b>
      </button>
      <button class="menu-button" type="button" aria-label="Open menu">${icon('menu')}</button>
    </div>
  </header>

  <main id="top">
    <section class="hero">
      <p class="hero-caption">A small collection for the hours<br>between work and whatever comes next.</p>
    </section>

    <section class="manifesto" id="about">
      <p class="manifesto-copy">We started this brand with the desire to create beautiful things and share them with others.<br>
We hope you’ll look forward to all the things we’ll create along the way.</p>
    </section>

    <section class="shop-section" id="shop">
      <div class="shop-heading">
        <div class="filters" role="group" aria-label="Filter products">
          <button class="filter active" data-filter="all" type="button">All <sup>06</sup></button>
          <button class="filter" data-filter="coffee" type="button">Coffee <sup>02</sup></button>
          <button class="filter" data-filter="wear" type="button">Wear <sup>02</sup></button>
          <button class="filter" data-filter="objects" type="button">Objects <sup>02</sup></button>
        </div>
      </div>
      <div class="product-grid" aria-live="polite"></div>
    </section>

    <section class="editorial" id="journal">
      <div class="editorial-image">
        <span class="photo-label">PLATE 01 / DAILY TOOLS</span>
      </div>
      <div class="editorial-copy">
        <div>
          <p class="eyebrow dark">Journal 001</p>
          <h2>The comfort<br>of repetition.</h2>
        </div>
        <div class="article-body">
          <p>같은 시간, 같은 잔, 같은 향. 반복되는 일상 속에서 취향은 조금씩 선명해집니다. H11은 매일 손이 가는 물건을 천천히 만들고 소개합니다.</p>
          <a href="#about">Read the story ${icon('arrow')}</a>
        </div>
        <span class="giant-eleven">11</span>
      </div>
    </section>

    <section class="tour-feature">
      <div class="tour-photo">
        <span class="snapshot-meta">HOME VISIT 04<br>MAPO-GU, SEOUL<br>04:17 PM</span>
      </div>
      <div class="tour-poster">
        <div class="tour-kicker"><span>H11 PRESENTS</span><span>ISSUE 01 / 2026</span></div>
        <div class="tour-title"><small>WELCOME TO THE</small><h2>after hours<br><i>coffee tour</i></h2></div>
        <p class="tour-intro">Coffee, records and a few good things.<br>Coming to a neighborhood near you.</p>
        <div class="tour-dates">
          <div><b>SEP 18</b><span>YEONNAM, SEOUL</span><i>◆</i></div>
          <div><b>SEP 26</b><span>SEONGSU, SEOUL</span><i>●</i></div>
          <div><b>OCT 03</b><span>EULJIRO, SEOUL</span><i>◇</i></div>
          <div><b>OCT 17</b><span>JEONPO, BUSAN</span><i>●</i></div>
          <div><b>NOV 07</b><span>DONGMYEONG, GWANGJU</span><i>◆</i></div>
          <div><b>NOV 21</b><span>JONGDAL, JEJU</span><i>◇</i></div>
        </div>
        <a class="tour-ticket" href="#shop">GET THE TOUR SET ${icon('arrow')}</a>
      </div>
    </section>

    <section class="newsletter">
      <div class="section-number">[ STAY IN THE LOOP ]</div>
      <h2>Letters from<br>the <i>late shift.</i></h2>
      <form class="signup-form">
        <label class="sr-only" for="email">Email address</label>
        <input id="email" type="email" placeholder="EMAIL ADDRESS" required>
        <button type="submit" aria-label="Subscribe">${icon('arrow')}</button>
      </form>
      <p class="form-status" aria-live="polite">Monthly notes, new roasts and small editions. No noise.</p>
    </section>
  </main>

  <footer>
    <a class="footer-mark" href="#top">H11</a>
    <div class="footer-links">
      <div><b>Visit</b><span>서울시 마포구 연남동 11-1<br>Tue–Sun, 11:00–20:00</span></div>
      <div><b>Follow</b><a href="#">Instagram</a><a href="#">Newsletter</a></div>
      <div><b>Help</b><a href="#">Shipping & returns</a><a href="mailto:hello@h11.kr">hello@h11.kr</a></div>
    </div>
    <p>© 2026 H11 STUDIO. ALL RIGHTS RESERVED.</p>
    <div class="footer-note">ROASTED IN SMALL BATCHES<br>DESIGNED IN SEOUL<br>EST. 2026</div>
  </footer>

  <div class="drawer-backdrop"></div>
  <aside class="cart-drawer" aria-hidden="true" aria-label="Shopping bag">
    <div class="drawer-head"><h2>Your bag <span class="cart-count">0</span></h2><button class="drawer-close" aria-label="Close bag">${icon('close')}</button></div>
    <div class="cart-items"></div>
    <div class="cart-empty"><span>( EMPTY FOR NOW )</span><p>Your next favorite thing<br>could be right over there.</p><button type="button" class="continue-shopping">Continue shopping</button></div>
    <div class="cart-summary">
      <div><span>Subtotal</span><strong class="cart-total">₩0</strong></div>
      <p>Shipping calculated at checkout.</p>
      <button type="button" class="checkout-button">Checkout</button>
    </div>
  </aside>

  <div class="mobile-panel" aria-hidden="true">
    <div class="mobile-panel-head"><a class="wordmark" href="#top">wanseo</a><button class="mobile-close" aria-label="Close menu">${icon('close')}</button></div>
    <nav><a href="#shop">Shop <span>01</span></a><a href="#about">Our story <span>02</span></a></nav>
    <div class="mobile-menu-actions">
      <button class="text-button search-trigger" type="button">Search ${icon('arrow')}</button>
      <button class="text-button login-trigger" type="button">Login ${icon('arrow')}</button>
      <button class="bag-button" type="button" aria-label="Open shopping bag">Bag <b class="cart-count">0</b></button>
    </div>
    <p>COFFEE / OBJECTS / DAILY UNIFORMS<br>SEOUL, KR — EST. 2026</p>
  </div>

  <section class="search-panel" aria-hidden="true" aria-label="Search products">
    <div class="search-head"><span>SEARCH THE H11 EDIT</span><button class="search-close" aria-label="Close search">${icon('close')}</button></div>
    <label class="sr-only" for="product-search">Search products</label>
    <input id="product-search" type="search" placeholder="TYPE TO SEARCH..." autocomplete="off">
    <div class="search-results"></div>
  </section>

  <div class="toast" role="status" aria-live="polite">Added to your bag</div>
`

const productGrid = document.querySelector<HTMLDivElement>('.product-grid')!

function renderProducts() {
  const visible = activeFilter === 'all' ? products : products.filter((product) => product.category === activeFilter)
  productGrid.innerHTML = visible.map((product, index) => `
    <article class="product-card" style="--delay: ${index * 60}ms">
      <button class="product-visual add-to-cart" data-id="${product.id}" aria-label="Add ${product.name} to bag">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
        <span class="quick-add">+ Quick add</span>
      </button>
      <div class="product-info"><div><h3>${product.name}</h3><p>${product.categoryLabel}</p></div><strong>₩${won.format(product.price)}</strong></div>
    </article>
  `).join('')

  document.querySelectorAll<HTMLButtonElement>('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.id)))
  })
}

const cartDrawer = document.querySelector<HTMLElement>('.cart-drawer')!
const mobilePanel = document.querySelector<HTMLElement>('.mobile-panel')!
const searchPanel = document.querySelector<HTMLElement>('.search-panel')!
const backdrop = document.querySelector<HTMLDivElement>('.drawer-backdrop')!

function setOverlay(type: 'cart' | 'menu' | 'search' | null) {
  cartDrawer.classList.toggle('open', type === 'cart')
  mobilePanel.classList.toggle('open', type === 'menu')
  searchPanel.classList.toggle('open', type === 'search')
  backdrop.classList.toggle('open', type !== null)
  cartDrawer.setAttribute('aria-hidden', String(type !== 'cart'))
  mobilePanel.setAttribute('aria-hidden', String(type !== 'menu'))
  searchPanel.setAttribute('aria-hidden', String(type !== 'search'))
  document.body.classList.toggle('locked', type !== null)
  if (type === 'search') window.setTimeout(() => document.querySelector<HTMLInputElement>('#product-search')?.focus(), 350)
}

function addToCart(id: number) {
  const product = products.find((item) => item.id === id)
  if (!product) return
  const existing = cart.find((item) => item.id === id)
  existing ? existing.quantity++ : cart.push({ ...product, quantity: 1 })
  renderCart()
  const toast = document.querySelector<HTMLDivElement>('.toast')!
  toast.textContent = `${product.name} added`
  toast.classList.add('show')
  window.setTimeout(() => toast.classList.remove('show'), 1800)
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  document.querySelectorAll<HTMLElement>('.cart-count').forEach((element) => element.textContent = String(count))
  document.querySelector<HTMLDivElement>('.cart-empty')!.classList.toggle('hidden', cart.length > 0)
  document.querySelector<HTMLDivElement>('.cart-summary')!.classList.toggle('visible', cart.length > 0)
  document.querySelector<HTMLElement>('.cart-total')!.textContent = `₩${won.format(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))}`
  document.querySelector<HTMLDivElement>('.cart-items')!.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div class="cart-thumb"></div>
      <div class="cart-item-copy"><h3>${item.name}</h3><p>${item.categoryLabel}</p><div class="quantity"><button data-action="minus" data-id="${item.id}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-action="plus" data-id="${item.id}" aria-label="Increase quantity">+</button></div></div>
      <strong>₩${won.format(item.price * item.quantity)}</strong>
    </div>
  `).join('')
}

document.querySelectorAll<HTMLButtonElement>('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter as 'all' | Category
    document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'))
    button.classList.add('active')
    renderProducts()
  })
})

document.querySelectorAll('.bag-button').forEach((button) => button.addEventListener('click', () => setOverlay('cart')))
document.querySelector('.menu-button')!.addEventListener('click', () => setOverlay('menu'))
document.querySelector('.drawer-close')!.addEventListener('click', () => setOverlay(null))
document.querySelector('.mobile-close')!.addEventListener('click', () => setOverlay(null))
document.querySelector('.search-close')!.addEventListener('click', () => setOverlay(null))
document.querySelector('.continue-shopping')!.addEventListener('click', () => setOverlay(null))
backdrop.addEventListener('click', () => setOverlay(null))
document.querySelectorAll('.mobile-panel a').forEach((link) => link.addEventListener('click', () => setOverlay(null)))

document.querySelector('.cart-items')!.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]')
  if (!button) return
  const item = cart.find((entry) => entry.id === Number(button.dataset.id))
  if (!item) return
  item.quantity += button.dataset.action === 'plus' ? 1 : -1
  cart = cart.filter((entry) => entry.quantity > 0)
  renderCart()
})

document.querySelector<HTMLFormElement>('.signup-form')!.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = document.querySelector<HTMLInputElement>('#email')!
  document.querySelector<HTMLElement>('.form-status')!.textContent = `Thanks — we'll write to ${input.value}.`
  input.value = ''
})

const searchResults = document.querySelector<HTMLDivElement>('.search-results')!
const searchInput = document.querySelector<HTMLInputElement>('#product-search')!

function renderSearch(query = '') {
  const keyword = query.trim().toLowerCase()
  const matches = keyword ? products.filter((product) => `${product.name} ${product.categoryLabel}`.toLowerCase().includes(keyword)) : products.slice(0, 3)
  searchResults.innerHTML = matches.length ? matches.map((product) => `
    <button type="button" data-search-id="${product.id}"><span>${product.name}</span><small>${product.categoryLabel}</small><strong>₩${won.format(product.price)}</strong></button>
  `).join('') : '<p>NO RESULTS. TRY “COFFEE” OR “MUG”.</p>'
}

document.querySelectorAll('.search-trigger').forEach((button) => button.addEventListener('click', () => setOverlay('search')))
searchInput.addEventListener('input', () => renderSearch(searchInput.value))
searchResults.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-search-id]')
  if (!button) return
  addToCart(Number(button.dataset.searchId))
  setOverlay('cart')
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setOverlay(null)
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'))
}, { threshold: 0.15 })
document.querySelectorAll('.manifesto, .shop-heading, .editorial-copy, .newsletter').forEach((el) => observer.observe(el))

renderProducts()
renderCart()
renderSearch()
