// components/admin/product/product-form.tsx
'use client'
import { useState, useEffect } from 'react'

interface ProductFormProps {
  mode: 'create' | 'edit'
  initial?: any
}

export default function ProductForm({ mode, initial }: ProductFormProps) {
  const [form, setForm] = useState<any>({
    name: initial?.name || '',
    description: initial?.description || '',
    sku: initial?.sku || '',
    category_id: initial?.category_id || '',
    price: initial?.price || 0,
    sale_price: initial?.sale_price || null,
    sale_start_date: initial?.sale_start_date || '',
    sale_end_date: initial?.sale_end_date || '',
    stock_quantity: initial?.stock_quantity || 0,
    weight_grams: initial?.weight_grams || null,
    attributes: initial?.attributes || {
      sizes: [],
      colors: [],
      material: '',
      care: ''
    },
    is_active: initial?.is_active ?? true,
    is_featured: initial?.is_featured ?? false,
    images: initial?.product_images?.map((i: any) => i.image_url) || [],
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Predefined age ranges for kids clothing
  const ageRanges = [
    { value: '3-4', label: '3-4 years' },
    { value: '4-5', label: '4-5 years' },
    { value: '5-6', label: '5-6 years' },
    { value: '6-7', label: '6-7 years' },
    { value: '7-8', label: '7-8 years' }
  ]

  // Auto-generate SKU when creating new product
  useEffect(() => {
    if (mode === 'create' && !form.sku) {
      const generateSKU = () => {
        const timestamp = Date.now().toString().slice(-6)
        const random = Math.random().toString(36).substring(2, 5).toUpperCase()
        return `VEOX-${timestamp}-${random}`
      }
      setForm(prev => ({ ...prev, sku: generateSKU() }))
    }
  }, [mode, form.sku])

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (e) {
      console.error('Failed to fetch categories:', e)
    } finally {
      setLoading(false)
    }
  }

  const submit = async () => {
    try {
      setSaving(true)
      setError(null)
      const endpoint = mode === 'create' ? '/api/products' : `/api/products/${initial.product_id}`
      const method = mode === 'create' ? 'POST' : 'PATCH'
      const res = await fetch(endpoint, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')
      window.location.href = '/admin/products'
    } catch (e: any) {
      setError(e.message)
    } finally { setSaving(false) }
  }

  return (
    <div className="space-y-6">
      {error && <div className="mono-card-header text-sm text-red-700">{error}</div>}

      <div className="mono-card">
        <div className="mono-card-header"><h3 className="text-black font-medium">Basic Info</h3></div>
        <div className="mono-card-body grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Product Name</label>
            <input className="mono-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">SKU</label>
            <input className="mono-input" value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})} placeholder="Auto-generated" readOnly={mode === 'create'} />
            {mode === 'create' && <p className="text-xs text-gray-500 mt-1">SKU is automatically generated</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea className="mono-input" rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          </div>
        </div>
      </div>

      <div className="mono-card">
        <div className="mono-card-header"><h3 className="text-black font-medium">Pricing</h3></div>
        <div className="mono-card-body grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Regular Price</label>
            <input type="number" className="mono-input" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Sale Price</label>
            <input type="number" className="mono-input" value={form.sale_price ?? ''} onChange={e=>setForm({...form,sale_price:e.target.value === '' ? null : Number(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Sale Start</label>
            <input type="date" className="mono-input" value={form.sale_start_date ?? ''} onChange={e=>setForm({...form,sale_start_date:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Sale End</label>
            <input type="date" className="mono-input" value={form.sale_end_date ?? ''} onChange={e=>setForm({...form,sale_end_date:e.target.value})} />
          </div>
        </div>
      </div>

      <div className="mono-card">
        <div className="mono-card-header"><h3 className="text-black font-medium">Inventory</h3></div>
        <div className="mono-card-body grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Stock Quantity</label>
            <input type="number" className="mono-input" value={form.stock_quantity} onChange={e=>setForm({...form,stock_quantity:Number(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Weight (grams)</label>
            <input type="number" className="mono-input" value={form.weight_grams ?? ''} onChange={e=>setForm({...form,weight_grams:e.target.value === '' ? null : Number(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category</label>
            <select 
              className="mono-select" 
              value={form.category_id} 
              onChange={e=>setForm({...form,category_id:Number(e.target.value)})}
              disabled={loading}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name} {category.age_range && `(${category.age_range})`}
                </option>
              ))}
            </select>
            {loading && <p className="text-xs text-gray-500 mt-1">Loading categories...</p>}
          </div>
        </div>
      </div>

      <div className="mono-card">
        <div className="mono-card-header"><h3 className="text-black font-medium">Attributes</h3></div>
        <div className="mono-card-body grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Available Age Ranges</label>
            <div className="space-y-2">
              {ageRanges.map(ageRange => (
                <label key={ageRange.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.attributes.sizes?.includes(ageRange.value) || false}
                    onChange={e => {
                      const currentSizes = form.attributes.sizes || []
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          attributes: {
                            ...form.attributes,
                            sizes: [...currentSizes, ageRange.value]
                          }
                        })
                      } else {
                        setForm({
                          ...form,
                          attributes: {
                            ...form.attributes,
                            sizes: currentSizes.filter(size => size !== ageRange.value)
                          }
                        })
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{ageRange.label}</span>
                </label>
              ))}
            </div>
            {form.attributes.sizes?.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {form.attributes.sizes.join(', ')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Available Colors (comma-separated)</label>
            <input className="mono-input" value={form.attributes.colors?.join(',')} onChange={e=>setForm({...form,attributes:{...form.attributes,colors:e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean)}})} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Material</label>
            <input className="mono-input" value={form.attributes.material || ''} onChange={e=>setForm({...form,attributes:{...form.attributes,material:e.target.value}})} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Care Instructions</label>
            <input className="mono-input" value={form.attributes.care || ''} onChange={e=>setForm({...form,attributes:{...form.attributes,care:e.target.value}})} />
          </div>
        </div>
      </div>

      <div className="mono-card">
        <div className="mono-card-header"><h3 className="text-black font-medium">Images</h3></div>
        <div className="mono-card-body space-y-3">
          <div className="text-sm text-gray-600">Provide image URLs for now. First image is primary.</div>
          {form.images.map((url: string, idx: number) => (
            <div key={idx} className="flex gap-2 items-center">
              <input className="mono-input flex-1" value={url} onChange={e=>{
                const images = [...form.images]; images[idx] = e.target.value; setForm({...form, images})
              }} />
              <button type="button" className="mono-btn-ghost" onClick={()=>{
                const images = form.images.filter((_: any, i: number)=> i!==idx); setForm({...form, images})
              }}>Remove</button>
            </div>
          ))}
          <button type="button" className="mono-btn" onClick={()=> setForm({...form, images:[...form.images, '']})}>Add Image</button>
        </div>
      </div>

      <div className="mono-card">
        <div className="mono-card-header"><h3 className="text-black font-medium">SEO & Status</h3></div>
        <div className="mono-card-body grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <input id="active" type="checkbox" checked={form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked})} />
            <label htmlFor="active" className="text-sm text-gray-700">Active</label>
          </div>
          <div className="flex items-center gap-2">
            <input id="featured" type="checkbox" checked={form.is_featured} onChange={e=>setForm({...form,is_featured:e.target.checked})} />
            <label htmlFor="featured" className="text-sm text-gray-700">Featured</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="button" onClick={submit} disabled={saving} className="mono-btn">{saving ? 'Saving...' : (mode === 'create' ? 'Create Product' : 'Save Changes')}</button>
      </div>
    </div>
  )
}


