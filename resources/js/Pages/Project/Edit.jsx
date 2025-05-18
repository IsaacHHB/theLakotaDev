import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, project }){

    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: project.name || "",
        status: project.status || "",
        description: project.description || "",
        due_date: project.due_date || "",
        _method: "PUT",
    });
    
    const onSubmit = (e) => {
        e.preventDefault();
    
        post(route("project.update", project.id));
    };
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit project "{project.name}"</h2>}
        >

            <Head title="Create" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form 
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white bg-gray-300 shadow sm:rounded-lg"
                        >

                            {project.image_path &&
                                <div className="mb-4">
                                    <img src={project.image_path} className="w-64" />
                                </div>
                            }
                            <div>
                                <InputLabel 
                                    htmlFor="project_image_path" 
                                    value="Project Image" 
                                />
                                <TextInput 
                                    id="project_image_path"
                                    type="file"
                                    name="image"
                                    className="block mt-1 w-full border-gray-300"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="project_name" value="Project Name" />

                                <TextInput
                                    id="project_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("name", e.target.value)}
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_description"
                                    value="Project Description"
                                />

                                <TextAreaInput
                                    id="project_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)}
                                />

                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_due_date"
                                    value="Project Deadline"
                                />

                                <TextInput
                                    id="project_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("due_date", e.target.value)}
                                />

                                <InputError message={errors.due_date} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="project_status" value="Project Status" />

                                <SelectInput
                                    name="status"
                                    id="project_status"
                                    value={data.status}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("status", e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>

                                <InputError message={errors.project_status} className="mt-2" />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("project.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                    >
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

// 'CENTRAL TEXTILE',
// 'Eagle Bend MFG',
// 'EBSCO Sign Group',
// 'Orchid Orthopedics',
// 'Precision Swiss Products',
// 'T-H Marine',
// 'L3Harris Palm Bay'
// 'NCS',
// 'HC Duke',
// 'Timpte',
// 'Textron',
// 'Shearer Foods',
// 'Wells Dairy',
// 'Deines',
// 'Titan Tires',
// 'IDFI',
// 'Great Plains',
// 'Putzmeister',
// 'Krones Inc.',
// 'Rite Hite',
// 'Smeal',
// 'Cementech',
// 'Broderson',
// 'Marlen Foods',
// 'Agri Spray Drones',
// 'KMT Waterjet',
// 'Vermeer',
// 'GT Midwest',
// 'Life Line',
// 'Fareway Foods',
// 'Hy Vee',
// 'Veolectra/Electric Outdoors',
// 'Affinitas',
// 'Adair/Argo',
// 'Ohler Pump',
// 'SHIELDS MFG',
// 'APEX IND',
// 'BB CUSTOM PRODUCTS',
// 'RENA TECHNOLOGIS',
// 'ICHOR SYSTEMS',
// 'EMI',
// 'EVOLUTION MACHINE',
// 'KEITH MFG',
// 'HALCO',
// 'PPM',
// 'Peterson Pacific',
// 'Bulk Handling Systems'
// 'MILGARD',
// 'TOOL-GAUGE AND MACHINE WORKS',
// 'ZAP',
// 'SELLEN CONSTRUCTION',
// 'HELION',
// 'TERRAPOWER',
// 'KIEWIT',
// 'JEMCO COMPONENTS',
// 'ANDERSEN CONSTRUCTION',
// 'LEGACY MASTER MARINE (SEATTLE, WA)',
// 'PACIFIC PILE AND MARINE',
// 'DURAFLAP / RUSTY SPOKE INDUSTRIES',
// 'CARSOE',
// 'TURNER CONSTRUCTION',
// 'MACHINISTS, INC',
// 'NOVOLEX SHIELD',
// 'TRUCKVAULT',
// 'JAMISON SIGNS',
// 'EVERETT SHIP REPAIR (EVERETT, WA)',
// 'SEQUOYAH CONSTRUCTION',
// 'MULTIFAB (AEROSPACE)',
// 'ODOM BEVERAGE CORPORATION',
// 'ORION CONSTRUCTION',
// 'JJR FABRICATION',
// 'ORCA BAY FOODS',
// 'MARQUIS OPERATING',
// 'ML MACHINE',
// 'NATIONAL GLASS',
// 'SEDRON',
// 'OLYMPIC FRUIT',
// 'ANDGAR',
// 'NATIONAL SIGN COMPANY',
// 'FISHERMANS FINEST',
// 'DELTA MARINE (SEATTLE, WA)'
