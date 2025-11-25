// // // components/admin/product/product-form.tsx
// // 'use client'
// // import { useState, useEffect } from 'react'
// // import { uploadProductImage } from '@/lib/upload-utils'

// // interface ProductFormProps {
// //   mode: 'create' | 'edit'
// //   initial?: any
// // }

// // export default function ProductForm({ mode, initial }: ProductFormProps) {
// //   const [form, setForm] = useState<any>({
// //     name: initial?.name || '',
// //     description: initial?.description || '',
// //     sku: initial?.sku || '',
// //     category_id: initial?.category_id || '',
// //     price: initial?.price || 0,
// //     sale_price: initial?.sale_price || null,
// //     sale_start_date: initial?.sale_start_date || '',
// //     sale_end_date: initial?.sale_end_date || '',
// //     stock_quantity: initial?.stock_quantity || 0,
// //     weight_grams: initial?.weight_grams || null,
// //     attributes: initial?.attributes || {
// //       sizes: [],
// //       colors: [],
// //       material: '',
// //       care: ''
// //     },
// //     is_active: initial?.is_active ?? true,
// //     is_featured: initial?.is_featured ?? false,
// //     images: initial?.product_images?.map((i: any) => i.image_url) || [],
// //   })

// //   const [saving, setSaving] = useState(false)
// //   const [error, setError] = useState<string | null>(null)
// //   const [categories, setCategories] = useState<any[]>([])
// //   const [loading, setLoading] = useState(false)

// //   // Predefined age ranges for kids clothing
// //   const ageRanges = [
// //     { value: '3-4', label: '3-4 years' },
// //     { value: '4-5', label: '4-5 years' },
// //     { value: '5-6', label: '5-6 years' },
// //     { value: '6-7', label: '6-7 years' },
// //     { value: '7-8', label: '7-8 years' }
// //   ]

// //   // Auto-generate SKU when creating new product
// //   useEffect(() => {
// //     if (mode === 'create' && !form.sku) {
// //       const generateSKU = () => {
// //         const timestamp = Date.now().toString().slice(-6)
// //         const random = Math.random().toString(36).substring(2, 5).toUpperCase()
// //         return `VEOX-${timestamp}-${random}`
// //       }
// //       setForm(prev => ({ ...prev, sku: generateSKU() }))
// //     }
// //   }, [mode, form.sku])

// //   // Fetch categories on mount
// //   useEffect(() => {
// //     fetchCategories()
// //   }, [])

// //   const fetchCategories = async () => {
// //     try {
// //       setLoading(true)
// //       const res = await fetch('/api/categories')
// //       const data = await res.json()
// //       setCategories(data.categories || [])
// //     } catch (e) {
// //       console.error('Failed to fetch categories:', e)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }
// // const handleImageUpload = async (file: File, index: number) => {
// //   try {
// //     setUploading(true)
      
// //     // Upload directly to Supabase
// //     const { url } = await uploadProductImage(file)
    
// //     // Update the images array with the new URL
// //     const updatedImages = [...form.images]
// //     updatedImages[index] = { url, isNew: true }
// //     setForm({ ...form, images: updatedImages })
    
// //   } catch (error) {
// //     console.error('Upload error:', error)
// //     setError('Failed to upload image')
// //   } finally {
// //     setUploading(false)
// //   }
// // }
// //   const submit = async () => {
// //     try {
// //       setSaving(true)
// //       setError(null)
// //       const endpoint = mode === 'create' ? '/api/products' : `/api/products/${initial.product_id}`
// //       const method = mode === 'create' ? 'POST' : 'PATCH'
// //       const res = await fetch(endpoint, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
// //       const data = await res.json()
// //       if (!res.ok) throw new Error(data.error || 'Failed to save')
// //       window.location.href = '/admin/products'
// //     } catch (e: any) {
// //       setError(e.message)
// //     } finally { setSaving(false) }
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {error && <div className="mono-card-header text-sm text-red-700">{error}</div>}

// //       <div className="mono-card">
// //         <div className="mono-card-header"><h3 className="text-black font-medium">Basic Info</h3></div>
// //         <div className="mono-card-body grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Product Name</label>
// //             <input className="mono-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">SKU</label>
// //             <input className="mono-input" value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})} placeholder="Auto-generated" readOnly={mode === 'create'} />
// //             {mode === 'create' && <p className="text-xs text-gray-500 mt-1">SKU is automatically generated</p>}
// //           </div>
// //           <div className="md:col-span-2">
// //             <label className="block text-sm text-gray-700 mb-1">Description</label>
// //             <textarea className="mono-input" rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
// //           </div>
// //         </div>
// //       </div>

// //       <div className="mono-card">
// //         <div className="mono-card-header"><h3 className="text-black font-medium">Pricing</h3></div>
// //         <div className="mono-card-body grid grid-cols-1 md:grid-cols-4 gap-4">
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Regular Price</label>
// //             <input type="number" className="mono-input" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Sale Price</label>
// //             <input type="number" className="mono-input" value={form.sale_price ?? ''} onChange={e=>setForm({...form,sale_price:e.target.value === '' ? null : Number(e.target.value)})} />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Sale Start</label>
// //             <input type="date" className="mono-input" value={form.sale_start_date ?? ''} onChange={e=>setForm({...form,sale_start_date:e.target.value})} />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Sale End</label>
// //             <input type="date" className="mono-input" value={form.sale_end_date ?? ''} onChange={e=>setForm({...form,sale_end_date:e.target.value})} />
// //           </div>
// //         </div>
// //       </div>

// //       <div className="mono-card">
// //         <div className="mono-card-header"><h3 className="text-black font-medium">Inventory</h3></div>
// //         <div className="mono-card-body grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Stock Quantity</label>
// //             <input type="number" className="mono-input" value={form.stock_quantity} onChange={e=>setForm({...form,stock_quantity:Number(e.target.value)})} />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Weight (grams)</label>
// //             <input type="number" className="mono-input" value={form.weight_grams ?? ''} onChange={e=>setForm({...form,weight_grams:e.target.value === '' ? null : Number(e.target.value)})} />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Category</label>
// //             <select 
// //               className="mono-select" 
// //               value={form.category_id} 
// //               onChange={e=>setForm({...form,category_id:Number(e.target.value)})}
// //               disabled={loading}
// //             >
// //               <option value="">Select a category</option>
// //               {categories.map(category => (
// //                 <option key={category.category_id} value={category.category_id}>
// //                   {category.name} {category.age_range && `(${category.age_range})`}
// //                 </option>
// //               ))}
// //             </select>
// //             {loading && <p className="text-xs text-gray-500 mt-1">Loading categories...</p>}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="mono-card">
// //         <div className="mono-card-header"><h3 className="text-black font-medium">Attributes</h3></div>
// //         <div className="mono-card-body grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Available Age Ranges</label>
// //             <div className="space-y-2">
// //               {ageRanges.map(ageRange => (
// //                 <label key={ageRange.value} className="flex items-center gap-2">
// //                   <input
// //                     type="checkbox"
// //                     checked={form.attributes.sizes?.includes(ageRange.value) || false}
// //                     onChange={e => {
// //                       const currentSizes = form.attributes.sizes || []
// //                       if (e.target.checked) {
// //                         setForm({
// //                           ...form,
// //                           attributes: {
// //                             ...form.attributes,
// //                             sizes: [...currentSizes, ageRange.value]
// //                           }
// //                         })
// //                       } else {
// //                         setForm({
// //                           ...form,
// //                           attributes: {
// //                             ...form.attributes,
// //                             sizes: currentSizes.filter(size => size !== ageRange.value)
// //                           }
// //                         })
// //                       }
// //                     }}
// //                     className="rounded border-gray-300"
// //                   />
// //                   <span className="text-sm text-gray-700">{ageRange.label}</span>
// //                 </label>
// //               ))}
// //             </div>
// //             {form.attributes.sizes?.length > 0 && (
// //               <p className="text-xs text-gray-500 mt-1">
// //                 Selected: {form.attributes.sizes.join(', ')}
// //               </p>
// //             )}
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Available Colors (comma-separated)</label>
// //             <input className="mono-input" value={form.attributes.colors?.join(',')} onChange={e=>setForm({...form,attributes:{...form.attributes,colors:e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean)}})} />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Material</label>
// //             <input className="mono-input" value={form.attributes.material || ''} onChange={e=>setForm({...form,attributes:{...form.attributes,material:e.target.value}})} />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-gray-700 mb-1">Care Instructions</label>
// //             <input className="mono-input" value={form.attributes.care || ''} onChange={e=>setForm({...form,attributes:{...form.attributes,care:e.target.value}})} />
// //           </div>
// //         </div>
// //       </div>

// //       <div className="mono-card">
// //         <div className="mono-card-header"><h3 className="text-black font-medium">Images</h3></div>
// //         <div className="mono-card-body space-y-3">
// //           <div className="text-sm text-gray-600">Provide image URLs for now. First image is primary.</div>
// //           {form.images.map((url: string, idx: number) => (
// //             <div key={idx} className="flex gap-2 items-center">
// //               <input className="mono-input flex-1" value={url} onChange={e=>{
// //                 const images = [...form.images]; images[idx] = e.target.value; setForm({...form, images})
// //               }} />
// //               <button type="button" className="mono-btn-ghost" onClick={()=>{
// //                 const images = form.images.filter((_: any, i: number)=> i!==idx); setForm({...form, images})
// //               }}>Remove</button>
// //             </div>
// //           ))}
// //           <button type="button" className="mono-btn" onClick={()=> setForm({...form, images:[...form.images, '']})}>Add Image</button>
// //         </div>
// //       </div>

// //       <div className="mono-card">
// //         <div className="mono-card-header"><h3 className="text-black font-medium">SEO & Status</h3></div>
// //         <div className="mono-card-body grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <div className="flex items-center gap-2">
// //             <input id="active" type="checkbox" checked={form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked})} />
// //             <label htmlFor="active" className="text-sm text-gray-700">Active</label>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <input id="featured" type="checkbox" checked={form.is_featured} onChange={e=>setForm({...form,is_featured:e.target.checked})} />
// //             <label htmlFor="featured" className="text-sm text-gray-700">Featured</label>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="flex justify-end">
// //         <button type="button" onClick={submit} disabled={saving} className="mono-btn">{saving ? 'Saving...' : (mode === 'create' ? 'Create Product' : 'Save Changes')}</button>
// //       </div>
// //     </div>
// //   )
// // }


// // components/admin/product/product-form.tsx
// // components/admin/product/product-form.tsx
// 'use client'
// import { useState, useEffect } from 'react'
// import { uploadProductImage } from '@/lib/upload-utils'
// import { AVAILABLE_SIZES } from '@/lib/types/product'
// interface ProductFormProps {
//   mode: 'create' | 'edit'
//   initial?: any
// }

// interface ProductImage {
//   url: string
//   isNew: boolean
// }
// interface SizeStock {
//   size_label: string
//   stock_quantity: number
// }
// interface ProductFormData {
//   name: string
//   description: string
//   sku: string
//   category_id: number | string
//   price: number
//   sale_price: number | null
//   sale_start_date: string
//   sale_end_date: string

//   weight_grams: number | null
//   attributes: {
//     sizes: string[]
//     colors: string[]
//     material: string
//     care: string
//   }
//   stock_quantity: number // Total stock (calculated)
//    sizes: SizeStock[] // Size-specific stock
//   is_active: boolean
//   is_featured: boolean
//   images: ProductImage[]
// }

// export default function ProductForm({ mode, initial }: ProductFormProps) {
//   const [form, setForm] = useState<ProductFormData>({
//     name: initial?.name || '',
//     description: initial?.description || '',
//     sku: initial?.sku || '',
//     category_id: initial?.category_id || '',
//     price: initial?.price || 0,
//     sale_price: initial?.sale_price || null,
//     sale_start_date: initial?.sale_start_date || '',
//     sale_end_date: initial?.sale_end_date || '',
//     stock_quantity: initial?.stock_quantity || 0,
//     weight_grams: initial?.weight_grams || null,
//     attributes: initial?.attributes || {
//       sizes: [],
//       colors: [],
//       material: '',
//       care: ''
//     },
//      sizes: initial?.sizes || [], // Initialize with empty sizes array
//     is_active: initial?.is_active ?? true,
//     is_featured: initial?.is_featured ?? false,
//     images: initial?.product_images?.map((i: any) => ({ url: i.image_url, isNew: false })) || [],
//   })

//   const [saving, setSaving] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [categories, setCategories] = useState<any[]>([])
//   const [loading, setLoading] = useState(false)
//   const [uploading, setUploading] = useState(false)
//   const [isClient, setIsClient] = useState(false)

//   // Predefined age ranges for kids clothing
//    // Predefined age ranges for kids clothing
//   const ageRanges = [
//     { value: '3yr', label: '3 Years' },
//     { value: '4yr', label: '4 Years' },
//     { value: '5yr', label: '5 Years' },
//     { value: '6yr', label: '6 Years' },
//     { value: '7yr', label: '7 Years' },
//     { value: '8yr', label: '8 Years' }
//   ]

//   // Set client-side flag to prevent hydration issues
//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   // Auto-generate SKU when creating new product
//   useEffect(() => {
//     if (mode === 'create' && !form.sku && isClient) {
//       const generateSKU = () => {
//         const timestamp = Date.now().toString().slice(-6)
//         const random = Math.random().toString(36).substring(2, 5).toUpperCase()
//         return `VEOX-${timestamp}-${random}`
//       }
//       setForm((prev: ProductFormData) => ({ ...prev, sku: generateSKU() }))
//     }
//   }, [mode, form.sku, isClient])

//   // Fetch categories on mount
//   useEffect(() => {
//     if (isClient) {
//       fetchCategories()
//     }
//   }, [isClient])
//   // Update sizes when selected sizes in attributes change
//   useEffect(() => {
//     const selectedSizes = form.attributes.sizes || []
//     const currentSizes = form.sizes || []
    
//     // Add new sizes that are selected but not in the sizes array
//     const newSizes = selectedSizes
//       .filter(sizeLabel => !currentSizes.find(s => s.size_label === sizeLabel))
//       .map(sizeLabel => ({
//         size_label: sizeLabel,
//         stock_quantity: 0
//       }))
    
//     // Remove sizes that are no longer selected
//     const updatedSizes = [
//       ...currentSizes.filter(size => selectedSizes.includes(size.size_label)),
//       ...newSizes
//     ]
    
//     // Calculate total stock quantity
//     const totalStock = updatedSizes.reduce((sum, size) => sum + size.stock_quantity, 0)
    
//     setForm(prev => ({
//       ...prev,
//       sizes: updatedSizes,
//       stock_quantity: totalStock
//     }))
//   }, [form.attributes.sizes])

//   const fetchCategories = async () => {
//     try {
//       setLoading(true)
//       const res = await fetch('/api/categories')
//       const data = await res.json()
//       setCategories(data.categories || [])
//     } catch (e) {
//       console.error('Failed to fetch categories:', e)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Handle image upload
//   const handleImageUpload = async (file: File, index: number) => {
//     try {
//       setUploading(true)
      
//       // Upload directly to Supabase
//       const { url } = await uploadProductImage(file)
      
//       // Update the images array with the new URL
//       const updatedImages = [...form.images]
//       updatedImages[index] = { url, isNew: true }
//       setForm({ ...form, images: updatedImages })
//       console.log(` DEBUG - Form images updated:`, updatedImages)
      
//     } catch (error) {
//       console.error('Upload error:', error)
//       setError('Failed to upload image')
//     } finally {
//       setUploading(false)
//     }
//   }

//   // Handle file input change
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       // Validate file type and size
//       if (!file.type.startsWith('image/')) {
//         setError('Please select an image file')
//         return
//       }
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         setError('Image size should be less than 5MB')
//         return
//       }
      
//       handleImageUpload(file, index)
//     }
//   }

//   // Add new image slot
//   const addImageSlot = () => {
//     setForm({ ...form, images: [...form.images, { url: '', isNew: false }] })
//   }

//   // Remove image
//   const removeImage = (index: number) => {
//     const images = form.images.filter((_: ProductImage, i: number) => i !== index)
//     setForm({ ...form, images })
//   }
// // Update size stock quantity
//   const updateSizeStock = (sizeLabel: string, quantity: number) => {
//     const updatedSizes = form.sizes.map(size => 
//       size.size_label === sizeLabel 
//         ? { ...size, stock_quantity: Math.max(0, quantity) }
//         : size
//     )
    
//     const totalStock = updatedSizes.reduce((sum, size) => sum + size.stock_quantity, 0)
    
//     setForm(prev => ({
//       ...prev,
//       sizes: updatedSizes,
//       stock_quantity: totalStock
//     }))
//   }

//   const submit = async () => {
//     try {
//       setSaving(true)
//       setError(null)
//       const validImages = form.images
//       .map((img: ProductImage) => img.url)
//       .filter((url: string) => url.trim() !== '')
    
//     console.log(' DEBUG - Form images:', form.images)
//     console.log(' DEBUG - Valid images to submit:', validImages)
//     console.log(' DEBUG - Form state:', form)

//     if (validImages.length === 0) {
//       setError('At least one image is required')
//       return
//     }
//       // Prepare data for API - extract only URLs
//       // const submitData = {
//       //   ...form,
//       //   images: form.images.map((img: ProductImage) => img.url).filter((url: string) => url)
//       // }
// // Prepare data exactly as your API expects
// // Validate that all selected sizes have stock quantities
//       const sizesWithInvalidStock = form.sizes.filter(size => 
//         size.stock_quantity < 0 || isNaN(size.stock_quantity)
//       )
      
//       if (sizesWithInvalidStock.length > 0) {
//         setError('Please enter valid stock quantities for all selected sizes')
//         return
//       }
//     const submitData = {
//       name: form.name,
//       description: form.description,
//       sku: form.sku,
//       category_id: form.category_id ? Number(form.category_id) : null,
//       price: Number(form.price),
//       sale_price: form.sale_price ? Number(form.sale_price) : null,
//       sale_start_date: form.sale_start_date || null,
//       sale_end_date: form.sale_end_date || null,
//       stock_quantity: Number(form.stock_quantity),
//       weight_grams: form.weight_grams ? Number(form.weight_grams) : null,
//       attributes: form.attributes,
//       is_active: form.is_active,
//       is_featured: form.is_featured,
//       images: validImages ,// This should be an array of strings (URLs)
//        sizes: form.sizes, // Include size-specific stock data
//     }
//     console.log(' DEBUG - Submitting to API:', JSON.stringify(submitData, null, 2))
//       const endpoint = mode === 'create' ? '/api/products' : `/api/products/${initial.product_id}`
//       const method = mode === 'create' ? 'POST' : 'PATCH'
      
//       const res = await fetch(endpoint, { 
//         method, 
//         headers: { 'Content-Type': 'application/json' }, 
//         body: JSON.stringify(submitData) 
//       })
      
//       const data = await res.json()
//       if (!res.ok) throw new Error(data.error || 'Failed to save')
      
//       window.location.href = '/admin/products'
//     } catch (e: any) {
//       setError(e.message)
//     } finally { 
//       setSaving(false) 
//     }
//   }

//   // Don't render file inputs during SSR
//   if (!isClient) {
//     return (
//       <div className="space-y-6">
//         <div className="mono-card">
//           <div className="mono-card-header">
//             <h3 className="text-black font-medium">Loading...</h3>
//           </div>
//           <div className="mono-card-body">
//             <p>Loading product form...</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {error && <div className="mono-card-header text-sm text-red-700">{error}</div>}

//       <div className="mono-card">
//         <div className="mono-card-header">
//           <h3 className="text-black font-medium">Basic Info</h3>
//         </div>
//         <div className="mono-card-body grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Product Name</label>
//             <input 
//               className="mono-input" 
//               value={form.name} 
//               onChange={e => setForm({...form, name: e.target.value})} 
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">SKU</label>
//             <input 
//               className="mono-input" 
//               value={form.sku} 
//               onChange={e => setForm({...form, sku: e.target.value})} 
//               placeholder="Auto-generated" 
//               readOnly={mode === 'create'} 
//             />
//             {mode === 'create' && <p className="text-xs text-gray-500 mt-1">SKU is automatically generated</p>}
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm text-gray-700 mb-1">Description</label>
//             <textarea 
//               className="mono-input" 
//               rows={4} 
//               value={form.description} 
//               onChange={e => setForm({...form, description: e.target.value})} 
//             />
//           </div>
//         </div>
//       </div>

//       <div className="mono-card">
//         <div className="mono-card-header">
//           <h3 className="text-black font-medium">Pricing</h3>
//         </div>
//         <div className="mono-card-body grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Regular Price</label>
//             <input 
//               type="number" 
//               className="mono-input" 
//               value={form.price} 
//               onChange={e => setForm({...form, price: Number(e.target.value)})} 
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Sale Price</label>
//             <input 
//               type="number" 
//               className="mono-input" 
//               value={form.sale_price ?? ''} 
//               onChange={e => setForm({...form, sale_price: e.target.value === '' ? null : Number(e.target.value)})} 
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Sale Start</label>
//             <input 
//               type="date" 
//               className="mono-input" 
//               value={form.sale_start_date ?? ''} 
//               onChange={e => setForm({...form, sale_start_date: e.target.value})} 
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Sale End</label>
//             <input 
//               type="date" 
//               className="mono-input" 
//               value={form.sale_end_date ?? ''} 
//               onChange={e => setForm({...form, sale_end_date: e.target.value})} 
//             />
//           </div>
//         </div>
//       </div>

//       <div className="mono-card">
//         <div className="mono-card-header">
//           <h3 className="text-black font-medium">Inventory</h3>
//         </div>
//         <div className="mono-card-body grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Stock Quantity</label>
//             <input 
//               type="number" 
//               className="mono-input" 
//               value={form.stock_quantity} 
//               onChange={e => setForm({...form, stock_quantity: Number(e.target.value)})} 
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Weight (grams)</label>
//             <input 
//               type="number" 
//               className="mono-input" 
//               value={form.weight_grams ?? ''} 
//               onChange={e => setForm({...form, weight_grams: e.target.value === '' ? null : Number(e.target.value)})} 
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Category</label>
//             <select 
//               className="mono-select" 
//               value={form.category_id} 
//               onChange={e => setForm({...form, category_id: Number(e.target.value)})}
//               disabled={loading}
//             >
//               <option value="">Select a category</option>
//               {categories.map(category => (
//                 <option key={category.category_id} value={category.category_id}>
//                   {category.name} {category.age_range && `(${category.age_range})`}
//                 </option>
//               ))}
//             </select>
//             {loading && <p className="text-xs text-gray-500 mt-1">Loading categories...</p>}
//           </div>
//         </div>
//       </div>

//       <div className="mono-card">
//         <div className="mono-card-header">
//           <h3 className="text-black font-medium">Attributes</h3>
//         </div>
//         <div className="mono-card-body grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Available Age Ranges</label>
//             <div className="space-y-2">
//               {ageRanges.map(ageRange => (
//                 <label key={ageRange.value} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={form.attributes.sizes?.includes(ageRange.value) || false}
//                     onChange={e => {
//                       const currentSizes = form.attributes.sizes || []
//                       if (e.target.checked) {
//                         setForm({
//                           ...form,
//                           attributes: {
//                             ...form.attributes,
//                             sizes: [...currentSizes, ageRange.value]
//                           }
//                         })
//                       } else {
//                         setForm({
//                           ...form,
//                           attributes: {
//                             ...form.attributes,
//                             sizes: currentSizes.filter((size: string) => size !== ageRange.value)
//                           }
//                         })
//                       }
//                     }}
//                     className="rounded border-gray-300"
//                   />
//                   <span className="text-sm text-gray-700">{ageRange.label}</span>
//                 </label>
//               ))}
//             </div>
//             {form.attributes.sizes?.length > 0 && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Selected: {form.attributes.sizes.join(', ')}
//               </p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Available Colors (comma-separated)</label>
//             <input 
//               className="mono-input" 
//               value={form.attributes.colors?.join(',')} 
//               onChange={e => setForm({
//                 ...form,
//                 attributes: {
//                   ...form.attributes,
//                   colors: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
//                 }
//               })} 
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Material</label>
//             <input 
//               className="mono-input" 
//               value={form.attributes.material || ''} 
//               onChange={e => setForm({
//                 ...form,
//                 attributes: {
//                   ...form.attributes,
//                   material: e.target.value
//                 }
//               })} 
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Care Instructions</label>
//             <input 
//               className="mono-input" 
//               value={form.attributes.care || ''} 
//               onChange={e => setForm({
//                 ...form,
//                 attributes: {
//                   ...form.attributes,
//                   care: e.target.value
//                 }
//               })} 
//             />
//           </div>
//         </div>
//       </div>

//       {/* Updated Images Section */}
//       <div className="mono-card">
//         <div className="mono-card-header">
//           <h3 className="text-black font-medium">Images</h3>
//         </div>
//         <div className="mono-card-body space-y-4">
//           <div className="text-sm text-gray-600">
//             Upload product images. First image will be used as primary.
//           </div>
          
//           {form.images.map((image: ProductImage, idx: number) => (
//             <div key={idx} className="flex gap-4 items-start border border-gray-200 rounded-lg p-4">
//               {/* Image Preview */}
//               <div className="flex-shrink-0">
//                 {image.url ? (
//                   <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
//                     <img 
//                       src={image.url} 
//                       alt={`Preview ${idx + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 ) : (
//                   <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
//                     <span className="text-gray-400 text-sm">No image</span>
//                   </div>
//                 )}
//               </div>
              
//               {/* Upload Controls */}
//               <div className="flex-1 space-y-2">
//                 <div className="flex gap-2">
//                   <label className="mono-btn cursor-pointer">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) => handleFileChange(e, idx)}
//                       disabled={uploading}
//                       key={`file-input-${idx}`}
//                     />
//                     {uploading ? 'Uploading...' : 'Choose File'}
//                   </label>
                  
//                   <button 
//                     type="button" 
//                     className="mono-btn-ghost" 
//                     onClick={() => removeImage(idx)}
//                     disabled={uploading}
//                   >
//                     Remove
//                   </button>
//                 </div>
                
//                 {/* URL display for uploaded images */}
//                 {image.url && (
//                   <div className="text-xs text-gray-500 break-all">
//                     {image.url}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
          
//           <button 
//             type="button" 
//             className="mono-btn" 
//             onClick={addImageSlot}
//             disabled={uploading}
//           >
//             Add Image Slot
//           </button>
//         </div>
//       </div>

//       <div className="mono-card">
//         <div className="mono-card-header">
//           <h3 className="text-black font-medium">SEO & Status</h3>
//         </div>
//         <div className="mono-card-body grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="flex items-center gap-2">
//             <input 
//               id="active" 
//               type="checkbox" 
//               checked={form.is_active} 
//               onChange={e => setForm({...form, is_active: e.target.checked})} 
//             />
//             <label htmlFor="active" className="text-sm text-gray-700">Active</label>
//           </div>
//           <div className="flex items-center gap-2">
//             <input 
//               id="featured" 
//               type="checkbox" 
//               checked={form.is_featured} 
//               onChange={e => setForm({...form, is_featured: e.target.checked})} 
//             />
//             <label htmlFor="featured" className="text-sm text-gray-700">Featured</label>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button 
//           type="button" 
//           onClick={submit} 
//           disabled={saving || uploading}
//           className="mono-btn"
//         >
//           {saving ? 'Saving...' : (mode === 'create' ? 'Create Product' : 'Save Changes')}
//         </button>
//       </div>
//     </div>
//   )
// }


'use client'
import { useState, useEffect } from 'react'
import { uploadProductImage } from '@/lib/upload-utils'
import { AVAILABLE_SIZES } from '@/lib/types/product'

interface ProductFormProps {
  mode: 'create' | 'edit'
  initial?: any
}

interface ProductImage {
  url: string
  isNew: boolean
}

interface SizeStock {
  size_label: string
  stock_quantity: number
}

interface ProductFormData {
  name: string
  description: string
  sku: string
  category_id: number | string
  price: number
  sale_price: number | null
  sale_start_date: string
  sale_end_date: string
  stock_quantity: number // Total stock (calculated)
  weight_grams: number | null
  attributes: {
    sizes: string[]
    colors: string[]
    material: string
    care: string
  }
  sizes: SizeStock[] // Size-specific stock
  is_active: boolean
  is_featured: boolean
  images: ProductImage[]
}

export default function ProductForm({ mode, initial }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
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
    sizes: initial?.sizes || [], // Initialize with empty sizes array
    is_active: initial?.is_active ?? true,
    is_featured: initial?.is_featured ?? false,
    images: initial?.product_images?.map((i: any) => ({ url: i.image_url, isNew: false })) || [],
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Predefined age ranges for kids clothing
  const ageRanges = [
    { value: '3yr', label: '3 Years' },
    { value: '4yr', label: '4 Years' },
    { value: '5yr', label: '5 Years' },
    { value: '6yr', label: '6 Years' },
    { value: '7yr', label: '7 Years' },
    { value: '8yr', label: '8 Years' }
  ]

  // Set client-side flag to prevent hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-generate SKU when creating new product
  useEffect(() => {
    if (mode === 'create' && !form.sku && isClient) {
      const generateSKU = () => {
        const timestamp = Date.now().toString().slice(-6)
        const random = Math.random().toString(36).substring(2, 5).toUpperCase()
        return `VEOX-${timestamp}-${random}`
      }
      setForm((prev: ProductFormData) => ({ ...prev, sku: generateSKU() }))
    }
  }, [mode, form.sku, isClient])

  // Fetch categories on mount
  useEffect(() => {
    if (isClient) {
      fetchCategories()
    }
  }, [isClient])

  // Update sizes when selected sizes in attributes change
  useEffect(() => {
    const selectedSizes = form.attributes.sizes || []
    const currentSizes = form.sizes || []
    
    // Add new sizes that are selected but not in the sizes array
    const newSizes = selectedSizes
      .filter(sizeLabel => !currentSizes.find(s => s.size_label === sizeLabel))
      .map(sizeLabel => ({
        size_label: sizeLabel,
        stock_quantity: 0
      }))
    
    // Remove sizes that are no longer selected
    const updatedSizes = [
      ...currentSizes.filter(size => selectedSizes.includes(size.size_label)),
      ...newSizes
    ]
    
    // Calculate total stock quantity
    const totalStock = updatedSizes.reduce((sum, size) => sum + size.stock_quantity, 0)
    
    setForm(prev => ({
      ...prev,
      sizes: updatedSizes,
      stock_quantity: totalStock
    }))
  }, [form.attributes.sizes])

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

  // Handle image upload
  const handleImageUpload = async (file: File, index: number) => {
    try {
      setUploading(true)
      
      // Upload directly to Supabase
      const { url } = await uploadProductImage(file)
      
      // Update the images array with the new URL
      const updatedImages = [...form.images]
      updatedImages[index] = { url, isNew: true }
      setForm({ ...form, images: updatedImages })
      console.log(` DEBUG - Form images updated:`, updatedImages)
      
    } catch (error) {
      console.error('Upload error:', error)
      setError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB')
        return
      }
      
      handleImageUpload(file, index)
    }
  }

  // Add new image slot
  const addImageSlot = () => {
    setForm({ ...form, images: [...form.images, { url: '', isNew: false }] })
  }

  // Remove image
  const removeImage = (index: number) => {
    const images = form.images.filter((_: ProductImage, i: number) => i !== index)
    setForm({ ...form, images })
  }

  // Update size stock quantity
  const updateSizeStock = (sizeLabel: string, quantity: number) => {
    const updatedSizes = form.sizes.map(size => 
      size.size_label === sizeLabel 
        ? { ...size, stock_quantity: Math.max(0, quantity) }
        : size
    )
    
    const totalStock = updatedSizes.reduce((sum, size) => sum + size.stock_quantity, 0)
    
    setForm(prev => ({
      ...prev,
      sizes: updatedSizes,
      stock_quantity: totalStock
    }))
  }

  const submit = async () => {
    try {
      setSaving(true)
      setError(null)
      
      const validImages = form.images
        .map((img: ProductImage) => img.url)
        .filter((url: string) => url.trim() !== '')
      
      console.log(' DEBUG - Form images:', form.images)
      console.log(' DEBUG - Valid images to submit:', validImages)
      console.log(' DEBUG - Form state:', form)

      if (validImages.length === 0) {
        setError('At least one image is required')
        return
      }

      // Validate that all selected sizes have stock quantities
      const sizesWithInvalidStock = form.sizes.filter(size => 
        size.stock_quantity < 0 || isNaN(size.stock_quantity)
      )
      
      if (sizesWithInvalidStock.length > 0) {
        setError('Please enter valid stock quantities for all selected sizes')
        return
      }

      // Prepare data exactly as your API expects
      const submitData = {
        name: form.name,
        description: form.description,
        sku: form.sku,
        category_id: form.category_id ? Number(form.category_id) : null,
        price: Number(form.price),
        sale_price: form.sale_price ? Number(form.sale_price) : null,
        sale_start_date: form.sale_start_date || null,
        sale_end_date: form.sale_end_date || null,
        stock_quantity: Number(form.stock_quantity),
        weight_grams: form.weight_grams ? Number(form.weight_grams) : null,
        attributes: form.attributes,
        sizes: form.sizes, // Include size-specific stock data
        is_active: form.is_active,
        is_featured: form.is_featured,
        images: validImages // This should be an array of strings (URLs)
      }
      
      console.log(' DEBUG - Submitting to API:', JSON.stringify(submitData, null, 2))
      
      const endpoint = mode === 'create' ? '/api/products' : `/api/products/${initial.product_id}`
      const method = mode === 'create' ? 'POST' : 'PATCH'
      
      const res = await fetch(endpoint, { 
        method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(submitData) 
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')
      
      window.location.href = '/admin/products'
    } catch (e: any) {
      setError(e.message)
    } finally { 
      setSaving(false) 
    }
  }

  // Don't render file inputs during SSR
  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="mono-card">
          <div className="mono-card-header">
            <h3 className="text-black font-medium">Loading...</h3>
          </div>
          <div className="mono-card-body">
            <p>Loading product form...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && <div className="mono-card-header text-sm text-red-700">{error}</div>}

      <div className="mono-card">
        <div className="mono-card-header">
          <h3 className="text-black font-medium">Basic Info</h3>
        </div>
        <div className="mono-card-body grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Product Name</label>
            <input 
              className="mono-input" 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">SKU</label>
            <input 
              className="mono-input" 
              value={form.sku} 
              onChange={e => setForm({...form, sku: e.target.value})} 
              placeholder="Auto-generated" 
              readOnly={mode === 'create'} 
            />
            {mode === 'create' && <p className="text-xs text-gray-500 mt-1">SKU is automatically generated</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea 
              className="mono-input" 
              rows={4} 
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})} 
            />
          </div>
        </div>
      </div>

      <div className="mono-card">
        <div className="mono-card-header">
          <h3 className="text-black font-medium">Pricing</h3>
        </div>
        <div className="mono-card-body grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Regular Price</label>
            <input 
              type="number" 
              className="mono-input" 
              value={form.price} 
              onChange={e => setForm({...form, price: Number(e.target.value)})} 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Sale Price</label>
            <input 
              type="number" 
              className="mono-input" 
              value={form.sale_price ?? ''} 
              onChange={e => setForm({...form, sale_price: e.target.value === '' ? null : Number(e.target.value)})} 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Sale Start</label>
            <input 
              type="date" 
              className="mono-input" 
              value={form.sale_start_date ?? ''} 
              onChange={e => setForm({...form, sale_start_date: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Sale End</label>
            <input 
              type="date" 
              className="mono-input" 
              value={form.sale_end_date ?? ''} 
              onChange={e => setForm({...form, sale_end_date: e.target.value})} 
            />
          </div>
        </div>
      </div>

      <div className="mono-card">
        <div className="mono-card-header">
          <h3 className="text-black font-medium">Inventory & Sizes</h3>
        </div>
        <div className="mono-card-body space-y-6">
          {/* Available Sizes Selection */}
          <div>
            <label className="block text-sm text-gray-700 mb-3">Available Sizes</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {ageRanges.map(ageRange => (
                <label key={ageRange.value} className="flex flex-col items-center p-3 border border-gray-300 rounded-lg hover:border-gray-400 cursor-pointer">
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
                            sizes: currentSizes.filter((size: string) => size !== ageRange.value)
                          }
                        })
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700 mt-2 text-center">{ageRange.label}</span>
                </label>
              ))}
            </div>
            {form.attributes.sizes?.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                Selected sizes: {form.attributes.sizes.join(', ')}
              </p>
            )}
          </div>

          {/* Size-specific Stock Quantities */}
          {form.attributes.sizes?.length > 0 && (
            <div>
              <label className="block text-sm text-gray-700 mb-3">Stock by Size</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {form.sizes.map((size) => (
                  <div key={size.size_label} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 text-center">
                      {ageRanges.find(a => a.value === size.size_label)?.label || size.size_label}
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="mono-input text-center"
                      value={size.stock_quantity}
                      onChange={e => updateSizeStock(size.size_label, Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total Stock Display */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Stock Quantity</span>
              <span className="text-lg font-bold text-gray-900">{form.stock_quantity}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Automatically calculated from size-specific quantities
            </p>
          </div>

          {/* Other Inventory Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Weight (grams)</label>
              <input 
                type="number" 
                className="mono-input" 
                value={form.weight_grams ?? ''} 
                onChange={e => setForm({...form, weight_grams: e.target.value === '' ? null : Number(e.target.value)})} 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Category</label>
              <select 
                className="mono-select" 
                value={form.category_id} 
                onChange={e => setForm({...form, category_id: Number(e.target.value)})}
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
      </div>

      <div className="mono-card">
        <div className="mono-card-header">
          <h3 className="text-black font-medium">Other Attributes</h3>
        </div>
        <div className="mono-card-body grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Available Colors (comma-separated)</label>
            <input 
              className="mono-input" 
              value={form.attributes.colors?.join(',')} 
              onChange={e => setForm({
                ...form,
                attributes: {
                  ...form.attributes,
                  colors: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
                }
              })} 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Material</label>
            <input 
              className="mono-input" 
              value={form.attributes.material || ''} 
              onChange={e => setForm({
                ...form,
                attributes: {
                  ...form.attributes,
                  material: e.target.value
                }
              })} 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Care Instructions</label>
            <input 
              className="mono-input" 
              value={form.attributes.care || ''} 
              onChange={e => setForm({
                ...form,
                attributes: {
                  ...form.attributes,
                  care: e.target.value
                }
              })} 
            />
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="mono-card">
        <div className="mono-card-header">
          <h3 className="text-black font-medium">Images</h3>
        </div>
        <div className="mono-card-body space-y-4">
          <div className="text-sm text-gray-600">
            Upload product images. First image will be used as primary.
          </div>
          
          {form.images.map((image: ProductImage, idx: number) => (
            <div key={idx} className="flex gap-4 items-start border border-gray-200 rounded-lg p-4">
              {/* Image Preview */}
              <div className="flex-shrink-0">
                {image.url ? (
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}
              </div>
              
              {/* Upload Controls */}
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <label className="mono-btn cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, idx)}
                      disabled={uploading}
                      key={`file-input-${idx}`}
                    />
                    {uploading ? 'Uploading...' : 'Choose File'}
                  </label>
                  
                  <button 
                    type="button" 
                    className="mono-btn-ghost" 
                    onClick={() => removeImage(idx)}
                    disabled={uploading}
                  >
                    Remove
                  </button>
                </div>
                
                {/* URL display for uploaded images */}
                {image.url && (
                  <div className="text-xs text-gray-500 break-all">
                    {image.url}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <button 
            type="button" 
            className="mono-btn" 
            onClick={addImageSlot}
            disabled={uploading}
          >
            Add Image Slot
          </button>
        </div>
      </div>

      <div className="mono-card">
        <div className="mono-card-header">
          <h3 className="text-black font-medium">SEO & Status</h3>
        </div>
        <div className="mono-card-body grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <input 
              id="active" 
              type="checkbox" 
              checked={form.is_active} 
              onChange={e => setForm({...form, is_active: e.target.checked})} 
            />
            <label htmlFor="active" className="text-sm text-gray-700">Active</label>
          </div>
          <div className="flex items-center gap-2">
            <input 
              id="featured" 
              type="checkbox" 
              checked={form.is_featured} 
              onChange={e => setForm({...form, is_featured: e.target.checked})} 
            />
            <label htmlFor="featured" className="text-sm text-gray-700">Featured</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          type="button" 
          onClick={submit} 
          disabled={saving || uploading}
          className="mono-btn"
        >
          {saving ? 'Saving...' : (mode === 'create' ? 'Create Product' : 'Save Changes')}
        </button>
      </div>
    </div>
  )
}