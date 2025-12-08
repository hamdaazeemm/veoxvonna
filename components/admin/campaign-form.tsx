// // components/admin/campaign-form.tsx
// 'use client'
// import { useState, useEffect } from 'react'

// interface CampaignFormProps {
//   mode: 'create' | 'edit'
//   initial?: any
// }

// export default function CampaignForm({ mode, initial }: CampaignFormProps) {
//   const [form, setForm] = useState({
//     name: initial?.name || '',
//     description: initial?.description || '',
//     campaign_type: initial?.campaign_type || 'percentage',
//     discount_value: initial?.discount_value || 0,
//     minimum_order_amount: initial?.minimum_order_amount || 0,
//     maximum_discount_amount: initial?.maximum_discount_amount || null,
//     is_active: initial?.is_active ?? true,
//     start_date: initial?.start_date || '',
//     end_date: initial?.end_date || '',
//     applies_to: initial?.applies_to || 'all',
//     usage_limit: initial?.usage_limit || null,
//     target_categories: initial?.target_categories || [],
//     target_products: initial?.target_products || [],
//   })

//   const [saving, setSaving] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [categories, setCategories] = useState<any[]>([])
//   const [products, setProducts] = useState<any[]>([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     fetchCategories()
//     fetchProducts()
//   }, [])

//   const fetchCategories = async () => {
//     try {
//       const res = await fetch('/api/categories')
//       const data = await res.json()
//       setCategories(data.categories || [])
//     } catch (e) {
//       console.error('Failed to fetch categories:', e)
//     }
//   }

//   const fetchProducts = async () => {
//     try {
//       setLoading(true)
//       const res = await fetch('/api/products')
//       const data = await res.json()
//       setProducts(data.products || [])
//     } catch (e) {
//       console.error('Failed to fetch products:', e)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const submit = async () => {
//     try {
//       setSaving(true)
//       setError(null)
//       const endpoint = mode === 'create' ? '/api/sales-campaigns' : `/api/sales-campaigns/${initial.campaign_id}`
//       const method = mode === 'create' ? 'POST' : 'PATCH'
//       const res = await fetch(endpoint, { 
//         method, 
//         headers: { 'Content-Type': 'application/json' }, 
//         body: JSON.stringify(form) 
//       })
//       const data = await res.json()
//       if (!res.ok) throw new Error(data.error || 'Failed to save')
//       window.location.href = '/admin/sales'
//     } catch (e: any) {
//       setError(e.message)
//     } finally { 
//       setSaving(false) 
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {error && <div className="mono-card-header text-sm text-red-700">{error}</div>}

//       <div className="mono-card">
//         <div className="mono-card-header"><h3 className="text-black font-medium">Basic Info</h3></div>
//         <div className="mono-card-body space-y-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Campaign Name</label>
//             <input className="mono-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Description</label>
//             <textarea className="mono-input" rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">Campaign Type</label>
//               <select className="mono-select" value={form.campaign_type} onChange={e=>setForm({...form,campaign_type:e.target.value})}>
//                 <option value="percentage">Percentage Discount</option>
//                 <option value="fixed">Fixed Amount Discount</option>
//                 <option value="free_shipping">Free Shipping</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">Applies To</label>
//               <select className="mono-select" value={form.applies_to} onChange={e=>setForm({...form,applies_to:e.target.value})}>
//                 <option value="all">All Products</option>
//                 <option value="categories">Specific Categories</option>
//                 <option value="products">Specific Products</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mono-card">
//         <div className="mono-card-header"><h3 className="text-black font-medium">Discount Settings</h3></div>
//         <div className="mono-card-body space-y-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               {form.campaign_type === 'percentage' ? 'Discount Percentage' : 
//                form.campaign_type === 'fixed' ? 'Discount Amount (Rs.)' : 
//                'Free Shipping Threshold (Rs.)'}
//             </label>
//             <input 
//               type="number" 
//               className="mono-input" 
//               value={form.discount_value} 
//               onChange={e=>setForm({...form,discount_value:Number(e.target.value)})}
//               placeholder={form.campaign_type === 'percentage' ? 'e.g., 20 for 20%' : 'e.g., 500 for Rs. 500'}
//             />
//           </div>
          
//           {form.campaign_type === 'percentage' && (
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">Maximum Discount Amount (Rs.)</label>
//               <input 
//                 type="number" 
//                 className="mono-input" 
//                 value={form.maximum_discount_amount || ''} 
//                 onChange={e=>setForm({...form,maximum_discount_amount:e.target.value === '' ? null : Number(e.target.value)})}
//                 placeholder="e.g., 1000 (optional)"
//               />
//             </div>
//           )}
          
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Minimum Order Amount (Rs.)</label>
//             <input 
//               type="number" 
//               className="mono-input" 
//               value={form.minimum_order_amount} 
//               onChange={e=>setForm({...form,minimum_order_amount:Number(e.target.value)})}
//               placeholder="e.g., 2000"
//             />
//           </div>
//         </div>
//       </div>

//       {form.applies_to === 'categories' && (
//         <div className="mono-card">
//           <div className="mono-card-header"><h3 className="text-black font-medium">Select Categories</h3></div>
//           <div className="mono-card-body">
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {categories.map(cat => (
//                 <label key={cat.category_id} className="flex items-center gap-2">
//                   <input 
//                     type="checkbox" 
//                     checked={form.target_categories.includes(cat.category_id)}
//                     onChange={e => {
//                       if (e.target.checked) {
//                         setForm({...form, target_categories: [...form.target_categories, cat.category_id]})
//                       } else {
//                         setForm({...form, target_categories: form.target_categories.filter(id => id !== cat.category_id)})
//                       }
//                     }}
//                   />
//                   <span className="text-sm text-gray-700">{cat.name}</span>
//                 </label>
//               ))}
//             </div>
//             {form.target_categories.length === 0 && (
//               <p className="text-sm text-gray-500 mt-2">No categories selected. Campaign will not apply to any products.</p>
//             )}
//           </div>
//         </div>
//       )}

//       {form.applies_to === 'products' && (
//         <div className="mono-card">
//           <div className="mono-card-header">
//             <h3 className="text-black font-medium">Select Products</h3>
//             <div className="flex items-center gap-2">
//               <input 
//                 type="text" 
//                 placeholder="Search products..." 
//                 className="mono-input w-64"
//                 onChange={e => {
//                   // Simple client-side filtering
//                   const searchTerm = e.target.value.toLowerCase()
//                   // This would need proper implementation with debouncing
//                 }}
//               />
//             </div>
//           </div>
//           <div className="mono-card-body max-h-64 overflow-y-auto">
//             {loading ? (
//               <div className="text-center text-gray-500">Loading products...</div>
//             ) : (
//               <div className="space-y-2">
//                 {products.map(product => (
//                   <label key={product.product_id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
//                     <input 
//                       type="checkbox" 
//                       checked={form.target_products.includes(product.product_id)}
//                       onChange={e => {
//                         if (e.target.checked) {
//                           setForm({...form, target_products: [...form.target_products, product.product_id]})
//                         } else {
//                           setForm({...form, target_products: form.target_products.filter(id => id !== product.product_id)})
//                         }
//                       }}
//                     />
//                     <div className="flex-1">
//                       <div className="text-sm font-medium text-black">{product.name}</div>
//                       <div className="text-xs text-gray-500">Rs. {product.price.toLocaleString()}</div>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
//             {form.target_products.length === 0 && (
//               <p className="text-sm text-gray-500 mt-2">No products selected. Campaign will not apply to any products.</p>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="mono-card">
//         <div className="mono-card-header"><h3 className="text-black font-medium">Schedule & Limits</h3></div>
//         <div className="mono-card-body grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Start Date</label>
//             <input type="datetime-local" className="mono-input" value={form.start_date} onChange={e=>setForm({...form,start_date:e.target.value})} />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">End Date</label>
//             <input type="datetime-local" className="mono-input" value={form.end_date} onChange={e=>setForm({...form,end_date:e.target.value})} />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Usage Limit</label>
//             <input type="number" className="mono-input" value={form.usage_limit || ''} onChange={e=>setForm({...form,usage_limit:e.target.value === '' ? null : Number(e.target.value)})} />
//           </div>
//         </div>
//       </div>

//       <div className="mono-card">
//         <div className="mono-card-header"><h3 className="text-black font-medium">Status</h3></div>
//         <div className="mono-card-body">
//           <div className="flex items-center gap-2">
//             <input id="active" type="checkbox" checked={form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked})} />
//             <label htmlFor="active" className="text-sm text-gray-700">Active Campaign</label>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button type="button" onClick={submit} disabled={saving} className="mono-btn">
//           {saving ? 'Saving...' : (mode === 'create' ? 'Create Campaign' : 'Save Changes')}
//         </button>
//       </div>
//     </div>
//   )
// }
// components/admin/campaign-form.tsx
'use client'
import { useState, useEffect } from 'react'

interface CampaignFormProps {
  mode: 'create' | 'edit'
  initial?: any
}

export default function CampaignForm({ mode, initial }: CampaignFormProps) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    description: initial?.description || '',
    campaign_type: initial?.campaign_type || 'percentage',
    discount_value: initial?.discount_value || 0,
    minimum_order_amount: initial?.minimum_order_amount || 0,
    maximum_discount_amount: initial?.maximum_discount_amount || null,
    is_active: initial?.is_active ?? true,
    start_date: initial?.start_date || '',
    end_date: initial?.end_date || '',
    applies_to: initial?.applies_to || 'all',
    usage_limit: initial?.usage_limit || null,
    target_categories: initial?.target_categories || [],
    target_products: initial?.target_products || [],
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (e) {
      console.error('Failed to fetch categories:', e)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data.products || [])
    } catch (e) {
      console.error('Failed to fetch products:', e)
    } finally {
      setLoading(false)
    }
  }

  const submit = async () => {
    try {
      setSaving(true)
      setError(null)
      const endpoint = mode === 'create' ? '/api/sales-campaigns' : `/api/sales-campaigns/${initial.campaign_id}`
      const method = mode === 'create' ? 'POST' : 'PATCH'
      const res = await fetch(endpoint, { 
        method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(form) 
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')
      window.location.href = '/admin/sales'
    } catch (e: any) {
      setError(e.message)
    } finally { 
      setSaving(false) 
    }
  }

  return (
    <div className="space-y-6">
      {error && <div className="mono-card-header text-sm text-red-700">{error}</div>}

      <div className="mono-card">
        <div className="mono-card-header"><h3 className="text-black font-medium">Basic Info</h3></div>
        <div className="mono-card-body space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Campaign Name</label>
            <input className="mono-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea className="mono-input" rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Campaign Type</label>
              <select className="mono-select" value={form.campaign_type} onChange={e=>setForm({...form,campaign_type:e.target.value})}>
                <option value="percentage">Percentage Discount</option>
                <option value="fixed">Fixed Amount Discount</option>
                <option value="free_shipping">Free Shipping</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Applies To</label>
              <select className="mono-select" value={form.applies_to} onChange={e=>setForm({...form,applies_to:e.target.value})}>
                <option value="all">All Products</option>
                <option value="categories">Specific Categories</option>
                <option value="products">Specific Products</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mono-card">
        <div className="mono-card-header"><h3 className="text-black font-medium">Discount Settings</h3></div>
        <div className="mono-card-body space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              {form.campaign_type === 'percentage' ? 'Discount Percentage' : 
               form.campaign_type === 'fixed' ? 'Discount Amount (Rs.)' : 
               'Free Shipping Threshold (Rs.)'}
            </label>
            <input 
              type="number" 
              className="mono-input" 
              value={form.discount_value} 
              onChange={e=>setForm({...form,discount_value:Number(e.target.value)})}
              placeholder={form.campaign_type === 'percentage' ? 'e.g., 20 for 20%' : 'e.g., 500 for Rs. 500'}
            />
          </div>
          
          {form.campaign_type === 'percentage' && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Maximum Discount Amount (Rs.)</label>
              <input 
                type="number" 
                className="mono-input" 
                value={form.maximum_discount_amount || ''} 
                onChange={e=>setForm({...form,maximum_discount_amount:e.target.value === '' ? null : Number(e.target.value)})}
                placeholder="e.g., 1000 (optional)"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm text-gray-700 mb-1">Minimum Order Amount (Rs.)</label>
            <input 
              type="number" 
              className="mono-input" 
              value={form.minimum_order_amount} 
              onChange={e=>setForm({...form,minimum_order_amount:Number(e.target.value)})}
              placeholder="e.g., 2000"
            />
          </div>
        </div>
      </div>

      {form.applies_to === 'categories' && (
        <div className="mono-card">
          <div className="mono-card-header"><h3 className="text-black font-medium">Select Categories</h3></div>
          <div className="mono-card-body">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map(cat => (
                <label key={cat.category_id} className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={form.target_categories.includes(cat.category_id)}
                    onChange={e => {
                      if (e.target.checked) {
                        setForm({...form, target_categories: [...form.target_categories, cat.category_id]})
                      } else {
                        setForm({...form, target_categories: form.target_categories.filter((id: number) => id !== cat.category_id)})
                      }
                    }}
                  />
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </label>
              ))}
            </div>
            {form.target_categories.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">No categories selected. Campaign will not apply to any products.</p>
            )}
          </div>
        </div>
      )}

      {form.applies_to === 'products' && (
        <div className="mono-card">
          <div className="mono-card-header">
            <h3 className="text-black font-medium">Select Products</h3>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="mono-input w-64"
                onChange={e => {
                  // Simple client-side filtering
                  const searchTerm = e.target.value.toLowerCase()
                  // This would need proper implementation with debouncing
                }}
              />
            </div>
          </div>
          <div className="mono-card-body max-h-64 overflow-y-auto">
            {loading ? (
              <div className="text-center text-gray-500">Loading products...</div>
            ) : (
              <div className="space-y-2">
                {products.map(product => (
                  <label key={product.product_id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input 
                      type="checkbox" 
                      checked={form.target_products.includes(product.product_id)}
                      onChange={e => {
                        if (e.target.checked) {
                          setForm({...form, target_products: [...form.target_products, product.product_id]})
                        } else {
                          setForm({...form, target_products: form.target_products.filter((id: number) => id !== product.product_id)})
                        }
                      }}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-black">{product.name}</div>
                      <div className="text-xs text-gray-500">Rs. {product.price.toLocaleString()}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
            {form.target_products.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">No products selected. Campaign will not apply to any products.</p>
            )}
          </div>
        </div>
      )}

      <div className="mono-card">
        <div className="mono-card-header"><h3 className="text-black font-medium">Schedule & Limits</h3></div>
        <div className="mono-card-body grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Start Date</label>
            <input type="datetime-local" className="mono-input" value={form.start_date} onChange={e=>setForm({...form,start_date:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">End Date</label>
            <input type="datetime-local" className="mono-input" value={form.end_date} onChange={e=>setForm({...form,end_date:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Usage Limit</label>
            <input type="number" className="mono-input" value={form.usage_limit || ''} onChange={e=>setForm({...form,usage_limit:e.target.value === '' ? null : Number(e.target.value)})} />
          </div>
        </div>
      </div>

      <div className="mono-card">
        <div className="mono-card-header"><h3 className="text-black font-medium">Status</h3></div>
        <div className="mono-card-body">
          <div className="flex items-center gap-2">
            <input id="active" type="checkbox" checked={form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked})} />
            <label htmlFor="active" className="text-sm text-gray-700">Active Campaign</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="button" onClick={submit} disabled={saving} className="mono-btn">
          {saving ? 'Saving...' : (mode === 'create' ? 'Create Campaign' : 'Save Changes')}
        </button>
      </div>
    </div>
  )
}