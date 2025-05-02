import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {gql} from "@/lib/graphql";
import {useMutation} from "@apollo/client";

const CREATE_USER = gql(`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            success
            user {
                id
                name
            }
        }
    }
`);

export default function CreateUserForm({refetch}: { refetch: () => void }) {
    const [mutateFunction, {data, loading, error}] = useMutation(CREATE_USER);

    const formUser = useForm<{ name: string }>({
        defaultValues: {
            name: "",
        },
    });

    async function onSubmit(values: { name: string }) {
        try {
            await mutateFunction({variables: {input: {name: values.name}}});
            refetch();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="mt-4 max-w-md">
            <h2 className="mb-4">Créer un Utilisateur</h2>
            <Form {...formUser}>
                <form onSubmit={formUser.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={formUser.control}
                        name="name"
                        rules={{
                            required: "Il faut un username",
                            minLength: {value: 6, message: "L'username doit comporter au moins 6 caractères"}
                        }}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="charly" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={loading}>
                        Créer
                    </Button>
                </form>
            </Form>
            {error && <div className="text-red-500">{error.message}</div>}
            {data && (
                <div
                    className={
                        data.createUser.success ? "text-green-500" : "text-red-500"
                    }
                >
                    {data.createUser.success ? "User created" : "User not created"}
                </div>
            )}
        </div>
    );
}
